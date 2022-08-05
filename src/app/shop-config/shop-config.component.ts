import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MashupShopService} from "../services/mashup-shop.service";
import {lastValueFrom} from "rxjs";
import {MashupShop} from "../models/mashup-shop";

@Component({
  selector: 'smp-shop-config',
  templateUrl: './shop-config.component.html',
  styleUrls: ['./shop-config.component.scss']
})
export class ShopConfigComponent implements OnInit, OnChanges {
  @Input() shop?: MashupShop;
  shopForm = this.fb.group({
    branchId: ['', Validators.required],
    name: ['', Validators.required],
    showName: [''],
    linkedUrl: [''],
    disabled: [false, Validators.required]
  });
  createNew = false;

  constructor(private fb: FormBuilder, private mashupShopService: MashupShopService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shop']) {
      if (this.shop) {
        this.shopForm.setValue({
          branchId: this.shop.id,
          name: this.shop.name,
          showName: this.shop.showName || '',
          linkedUrl: this.shop.linkedUrl || '',
          disabled: this.shop.disabled
        })
      }
    } else {
      this.createNew = true;
    }

  }

  async addOrSaveShop() {
    console.log(this.shopForm.value);
    chayns.showWaitCursor();
    if (this.createNew) {
      const mashupShop = await lastValueFrom(this.mashupShopService.addNewShop(Number(this.shopForm.value.branchId), {
        name: this.shopForm.value.name || '',
        showName: this.shopForm.value.showName || '',
        linkedUrl: this.shopForm.value.linkedUrl || '',
        disabled: this.shopForm.value.disabled || false
      }));
      console.log('added new mashup', mashupShop);
    } else {
      // TODO: save changes for mashup shop
    }
    
    chayns.hideWaitCursor();
  }

  getHeaderTitle(): string {
    if (this.createNew) {
      return 'Shop hinzufügen';
    }

    return this.shop?.name || this.shop?.showName || 'Unbenannter Shop';
  }

}
