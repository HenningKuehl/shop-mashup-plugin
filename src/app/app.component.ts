import {Component, OnInit} from '@angular/core';
import {CpsAppHelperService, isShopMashupPluginInstanceConfig} from "cps-app-helper";
import {MashupService} from "./services/mashup.service";
import {MashupShop} from "./models/mashup-shop";
import {Identifier} from "./models/identifier";
import {FilterButtonComponent} from "ngx-chayns-components";
import {ShopOrderType} from "./models/shop-order-type";

@Component({
  selector: 'smp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  adminMode = chayns.env.user.adminMode;
  selectedTagIds: string[] = [];
  allTagsSelected: boolean = true;
  initialLoading: boolean = true;
  mashupId!: string;

  shops = this.mashupService.shops.asObservable();
  tags = this.mashupService.tags.asObservable();
  shopOrderType: ShopOrderType = ShopOrderType.openStatus;
  shopOrderTypeEnum = ShopOrderType;

  constructor(private cpsAppHelper: CpsAppHelperService, private mashupService: MashupService) {
  }

  ngOnInit() {
    // TODO: check authentication
    // TODO: optimize mashup loading
    this.cpsAppHelper.getAppInstance().subscribe(appInstance => {
      console.log('app instance', appInstance.config);
      const config = appInstance.config;
      if (config && isShopMashupPluginInstanceConfig(config)) {
        this.mashupId = config.mashupRef.id;
        this.loadMashup();
      }
    });
  }

  async loadMashup() {
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
