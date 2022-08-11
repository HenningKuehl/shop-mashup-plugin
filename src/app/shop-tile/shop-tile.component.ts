import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MashupShop, MashupShopLiveData} from "../models/mashup-shop";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, firstValueFrom, lastValueFrom, Observable, Subscription} from "rxjs";
import {MashupService} from "../services/mashup.service";
import {Tag} from "../models/tag";
import {MashupShopService} from "../services/mashup-shop.service";

@Component({
  selector: 'smp-shop-tile',
  templateUrl: './shop-tile.component.html',
  styleUrls: ['./shop-tile.component.scss']
})
export class ShopTileComponent implements OnInit, OnDestroy {
  // TODO: get mashupId via service
  @Input() mashupId!: string;
  @Input() shop!: MashupShop;
  tags: Tag[] = [];
  tagsSubscription: Subscription | null = null;

  liveSubscription: Subscription | null = null;
  live: MashupShopLiveData | undefined = undefined;
  loadingLiveData = false;

  iconUrl = new Observable<string>();
  backgroundUrl = new Observable<string>();

  constructor(
    private mashupService: MashupService,
    private mashupShopService: MashupShopService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.subscribeTags();
    if (this.shop.live) {
      this.live = this.shop.live;
    } else {
      this.loadingLiveData = true;
      this.subscribeLiveData();
    }

    this.getBackgroundUrl();
    this.getIconUrl();
  }

  ngOnDestroy() {
    if (this.tagsSubscription) {
      this.tagsSubscription.unsubscribe();
    }
    if (this.liveSubscription) {
      this.liveSubscription.unsubscribe();
    }
  }

  subscribeTags(): void {
    this.tagsSubscription = this.mashupService.tags.asObservable()
      .subscribe(tags => this.tags = tags);
  }

  getTagNames(): string[] {
    return this.tags.filter(tag => this.shop.tagRefs.map(ref => ref.id).includes(tag.id)).map(tag => tag.name);
  }

  clickTile() {
    if (this.shop.linkedUrl) {
      window.open(this.shop.linkedUrl, '_blank');
    }

    if (this.shop.linkedTappId) {
      chayns.selectTapp({id: this.shop.linkedTappId});
    }
  }

  hasLink(): boolean {
    return this.shop.linkedUrl !== '' || this.shop.linkedTappId !== 0;
  }

  isOpen(): boolean {
    return this.shop.live === undefined ? true : this.shop.live.open;
  }

  private getIconUrl() {
    this.iconUrl = this.storage
      .ref(`shop-mashup-plugin/${this.mashupId}/${this.shop.id}/icon.jpg`)
      .getDownloadURL();
  }

  private getBackgroundUrl() {
    this.backgroundUrl = this.storage
      .ref(`shop-mashup-plugin/${this.mashupId}/${this.shop.id}/background.jpg`)
      .getDownloadURL();
  }

  private subscribeLiveData(): void {
    this.mashupShopService.getLiveData(this.mashupId, Number(this.shop.id))
      .subscribe(liveData => {
        this.live = liveData;
        this.loadingLiveData = false;
      });
  }
}
