import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MashupShopService} from "../services/mashup-shop.service";
import {lastValueFrom, Subscription} from "rxjs";
import {MashupShop} from "../models/mashup-shop";
import {MashupService} from "../services/mashup.service";
import {Tag} from "../models/tag";
import buttonType = chayns.dialog.buttonType;

@Component({
  selector: 'smp-shop-config',
  templateUrl: './shop-config.component.html',
  styleUrls: ['./shop-config.component.scss']
})
export class ShopConfigComponent implements OnInit, OnChanges, OnDestroy {
  @Input() shop?: MashupShop;
  @Input() mashupId!: string;

  @Output() created = new EventEmitter<MashupShop>();
  @Output() updated = new EventEmitter<MashupShop>();
  @Output() deleted = new EventEmitter();
  loading = false;

  shopForm = this.fb.group({
    branchId: ['', Validators.required],
    name: ['', Validators.required],
    showName: [''],
    linkedUrl: [''],
    linkedTappId: [''],
    disabled: [false, Validators.required],
    locationId: ['', [Validators.required, Validators.min(1)]]
  });

  createNew = false;
  tags: Tag[] = [];
  tagsSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private mashupShopService: MashupShopService, private mashupService: MashupService) {
  }

  ngOnInit(): void {
    if (!this.shop) {
      this.createNew = true;
    }
    this.getTags();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shop']) {
      if (this.shop) {
        this.shopForm.setValue({
          branchId: this.shop.id,
          name: this.shop.name,
          showName: this.shop.showName || '',
          linkedUrl: this.shop.linkedUrl || '',
          disabled: this.shop.disabled,
          locationId: `${this.shop.locationId}`,
          linkedTappId: `${this.shop.linkedTappId}`
        })
      }
    }
  }

  ngOnDestroy() {
    if (this.tagsSubscription) {
      this.tagsSubscription.unsubscribe();
    }
  }

  getTags() {
    this.tagsSubscription = this.mashupService
      .tags
      .asObservable()
      .subscribe(tags => this.tags = tags);
  }

  async addOrSaveShop() {
    console.log(this.shopForm.value);
    chayns.showWaitCursor();
    this.loading = true;
    if (this.createNew) {
      const mashupShop = await lastValueFrom(this.mashupShopService.addNewShop(this.mashupId, Number(this.shopForm.value.branchId), {
        name: this.shopForm.value.name || '',
        showName: this.shopForm.value.showName || '',
        linkedUrl: this.shopForm.value.linkedUrl || '',
        disabled: this.shopForm.value.disabled || false,
        locationId: Number(this.shopForm.value.locationId),
        linkedTappId: Number(this.shopForm.value.linkedTappId) || 0,
      }));
      this.created.emit(mashupShop);
      this.shopForm.reset();
      console.log('added new mashup', mashupShop);
    } else {
      const mashupShop = await lastValueFrom(this.mashupShopService.updateShop(this.mashupId, Number(this.shopForm.value.branchId), {
        name: this.shopForm.value.name || '',
        showName: this.shopForm.value.showName || '',
        linkedUrl: this.shopForm.value.linkedUrl || '',
        disabled: this.shopForm.value.disabled || false,
        locationId: Number(this.shopForm.value.locationId),
        linkedTappId: Number(this.shopForm.value.linkedTappId) || 0,
      }));
      console.log('updated shop', mashupShop);
      this.updated.emit(mashupShop);
    }

    chayns.hideWaitCursor();
    this.loading = false;
  }

  getHeaderTitle(): string {
    if (this.createNew) {
      return 'Shop hinzufügen';
    }

    return this.shop?.name || this.shop?.showName || 'Unbenannter Shop';
  }

  getImagePath(): string {
    return `shop-mashup-plugin/${this.mashupId}/${this.shopForm.value.branchId}`;
  }

  openTagsSelectionDialog() {
    const tagIds = this.shop?.tagRefs.map(ref => ref.id) || [];

    const list: DialogSelectConfigItem[] = this.tags.map(tag => ({
      name: tag.name,
      isSelected: tagIds.includes(tag.id) || false,
      value: tag.id,
    }));

    chayns.dialog.select({
      list,
      multiselect: true,
      quickfind: true,
      title: ''
    }).then(async result => {
      chayns.showWaitCursor();
      this.loading = true;
      if (result.buttonType === buttonType.POSITIVE && this.shop) {
        const selectedTagIds = result
          .selection
          .map(item => item.value)
          .filter((item): item is string => !!item)

        const addedTagIds = selectedTagIds
          .filter(item => !tagIds.includes(item))

        const removedTagIds = tagIds
          .filter(id => !selectedTagIds.includes(id));

        console.log('added tag ids', addedTagIds);
        console.log('removed tag ids', removedTagIds);

        const mashupShop = await this.mashupService.updateTagsForShop(this.mashupId, this.shop.id, addedTagIds, removedTagIds);
        console.log('updated tags', mashupShop);
        this.updated.emit(mashupShop);
      }
      chayns.hideWaitCursor();
      this.loading = false;
    })
  }

  getTagNames(): string {
    const names = this.tags
      .filter(tag => this.shop?.tagRefs.map(ref => ref.id).includes(tag.id))
      .map(tag => tag.name);

    if (names.length === 0) {
      return 'Auswählen';
    }

    if (names.length === 1) {
      return names[0];
    }

    if (names.length === 2) {
      return `${names[0]}, ${names[1]}`;
    }

    return `${names.length} ausgewählt`;
  }

  deleteShop(): void {
    chayns.dialog.confirm('Shop löschen', 'Soll der Shop wirklich gelöscht werden?')
      .then(async result => {
        console.log(result, this.shop, this.createNew);
        if (result === buttonType.POSITIVE && this.shop && !this.createNew) {
          chayns.showWaitCursor();
          this.loading = true;
          await lastValueFrom(this.mashupShopService.deleteShop(this.mashupId, Number(this.shop.id)));
          chayns.hideWaitCursor();
          this.loading = false;
          this.deleted.emit();
        }
      });
  }

  openLinkedTappSelectDialog() {

    const list: DialogSelectConfigItem[] = chayns.env.site.tapps
      .filter(tapp => tapp.sortId >= 0)
      .sort(tapp => tapp.sortId)
      .map(tapp => ({
        name: tapp.showName,
        isSelected: Number(this.shopForm.value.linkedTappId) === tapp.id,
        value: `${tapp.id}`,
      }))

    chayns.dialog.select({
      list,
      multiselect: false,
      quickfind: true,
      title: ''
    }).then(result => {
      if (result.buttonType === buttonType.POSITIVE) {
        this.shopForm.patchValue({
          linkedTappId: result.selection[0].value,
          linkedUrl: '',
        });
        this.shopForm.markAsTouched();
      }
    }).catch(console.error);
  }

  linkedUrlChanged(event: Event): void {
    this.shopForm.patchValue({
      linkedTappId: '',
    })
  }

  getLinkedTapp(): string {
    return chayns.env.site.tapps.find(tapp => tapp.id === Number(this.shopForm.value.linkedTappId))?.showName || 'Keinen Ausgewählt';
  }

}
