import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MashupShop} from "../models/mashup-shop";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, firstValueFrom, lastValueFrom, Subscription} from "rxjs";
import {MashupService} from "../services/mashup.service";
import {Tag} from "../models/tag";

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

  constructor(private mashupService: MashupService) {
  }

  ngOnInit(): void {
    this.subscribeTags();
  }

  ngOnDestroy() {
    if (this.tagsSubscription) {
      this.tagsSubscription.unsubscribe();
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
  }

}
