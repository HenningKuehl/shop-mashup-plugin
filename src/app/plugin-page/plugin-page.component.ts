import {Component, Input, OnInit} from '@angular/core';
import {AppInstance} from "cps-app-helper/lib/models/app-instance";
import {MashupService} from "../services/mashup.service";
import {MashupShop} from "../models/mashup-shop";
import {Identifier} from "../models/identifier";
import {FilterButtonComponent} from "ngx-chayns-components";
import {ShopOrderType} from "../models/shop-order-type";

@Component({
  selector: 'smp-plugin-page',
  templateUrl: './plugin-page.component.html',
  styleUrls: ['./plugin-page.component.scss']
})
export class PluginPageComponent implements OnInit {
  @Input() instance!: AppInstance<{ mashupRef: { id: string, path: string } }>;
  @Input() adminMode!: boolean;

  mashupId: string | null = null;
  initialLoading: boolean = true;

  selectedTagIds: string[] = [];
  allTagsSelected: boolean = true;

  shops = this.mashupService.shops.asObservable();
  tags = this.mashupService.tags.asObservable();
  shopOrderType: ShopOrderType = ShopOrderType.openStatus;
  shopOrderTypeEnum = ShopOrderType;

  constructor(private mashupService: MashupService) { }

  ngOnInit(): void {
    this.mashupId = this.instance.config.mashupRef.id;
    this.loadMashup();
  }

  async loadMashup() {
    if (!this.mashupId) {
      return;
    }
    await this.mashupService.loadMashup(this.mashupId);
    if (this.initialLoading) {
      this.selectedTagIds = this.mashupService.tags.getValue().map(tag => tag.id);
      this.initialLoading = false;
    }
  }

  newShopAdded(shop: MashupShop) {
    this.loadMashup();
  }

  identify(index: number, item: Identifier): string {
    return item.id;
  }

  tagSelectionChanged(chips: FilterButtonComponent[]): void {
    this.selectedTagIds = chips.map(chip => chip.id);
    this.allTagsSelected = this.selectedTagIds.length === this.mashupService.tags.getValue().length;
  }

  setShopOrderType(shopOrderType: ShopOrderType) {
    this.shopOrderType = shopOrderType;
  }

}
