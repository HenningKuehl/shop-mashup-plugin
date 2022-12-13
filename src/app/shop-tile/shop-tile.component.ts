import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MashupShop, MashupShopFeedback, MashupShopLiveData} from "../models/mashup-shop";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, firstValueFrom, lastValueFrom, Observable, Subscription} from "rxjs";
import {MashupService} from "../services/mashup.service";
import {Tag} from "../models/tag";
import {MashupShopService} from "../services/mashup-shop.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'smp-shop-tile',
  templateUrl: './shop-tile.component.html',
  styleUrls: ['./shop-tile.component.scss']
})
export class ShopTileComponent implements OnChanges, OnInit, OnDestroy {
  // TODO: get mashupId via service
  @Input() mashupId!: string;
  @Input() shop!: MashupShop;

  tags: Tag[] = [];
  tagsSubscription: Subscription | null = null;

  liveSubscription: Subscription | null = null;
  live: MashupShopLiveData | undefined = undefined;
  feedback: MashupShopFeedback | undefined = undefined;
  loadingLiveData = false;

  iconUrl = new Observable<string>();
  backgroundUrl = new Observable<string>();

  adminMode = chayns.env.user.adminMode;

  constructor(
    private mashupService: MashupService,
    private mashupShopService: MashupShopService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shop']) {
      this.getBackgroundUrl();
      this.getIconUrl();
    }
  }

  ngOnInit(): void {
    this.subscribeTags();
    if (this.shop.live) {
      this.live = this.shop.live;
    } else {
      this.loadingLiveData = true;
      this.subscribeLiveData();
    }
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

  disableProcessor(id: number): void {
    chayns.showWaitCursor();
    this.mashupShopService.disableProcessor(this.mashupId, this.shop.id, id)
      .subscribe({
          next: () => {
            const processor = this.live?.processors.find(processor => processor.id === id);
            if (processor) {
              processor.disabled = true;
            }
          },
          error: error => console.log(error),
          complete: () => {
            chayns.hideWaitCursor();
            // @ts-ignore
            chayns.dialog.toast({
              description: 'Bestellabschluss erfolgreich ausgeblendet.',
              showCloseIcon: true,
              showDurationBar: false,
              duration: 2000
            });
          }
        }
      );
  }

  enableProcessor(id: number): void {
    chayns.showWaitCursor();
    this.mashupShopService.enableProcessor(this.mashupId, this.shop.id, id)
      .subscribe({
          next: () => {
            const processor = this.live?.processors.find(processor => processor.id === id);
            if (processor) {
              processor.disabled = false;
            }
          },
          error: error => console.log(error),
          complete: () => {
            chayns.hideWaitCursor();
            // @ts-ignore
            chayns.dialog.toast({
              description: 'Bestellabschluss erfolgreich eingeblendet.',
              showCloseIcon: true,
              showDurationBar: false,
              duration: 2000
            });
          }
        }
      );
  }

  private getIconUrl() {
    if (this.shop.iconStoragePath) {
      this.iconUrl = this.storage
        .ref(this.shop.iconStoragePath)
        .getDownloadURL();
    }
  }

  private getBackgroundUrl() {
    if (this.shop.backgroundStoragePath) {
      this.backgroundUrl = this.storage
        .ref(this.shop.backgroundStoragePath)
        .getDownloadURL()
    }
  }

  private subscribeLiveData(): void {
    this.mashupShopService.getShopWithLiveData(this.mashupId, Number(this.shop.id))
      .subscribe(liveShop => {
        this.live = liveShop?.live;
        this.feedback = liveShop?.feedback;
        this.loadingLiveData = false;
      });
  }

  getFeedbackStars(): ('star' | 'star_border' | 'star_half')[] {
    if (!this.feedback) {
      return [];
    }

    const stars: ('star' | 'star_border' | 'star_half')[] = [];

    let fullStars = Math.floor(this.feedback.average);
    const rest = 5 - this.feedback.average;
    if (rest < 0.05 && rest > 0) {
      fullStars++;
    }
    const emptyStars = Math.round(rest);
    const halfStar = (fullStars + emptyStars) !== 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    if (halfStar) {
      stars.push('star_half');
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('star_border')
    };

    return stars;
  }
}
