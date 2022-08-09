import {Component, OnInit} from '@angular/core';
import {CpsAppHelperService, isShopMashupPluginInstanceConfig} from "cps-app-helper";
import {MashupService} from "./services/mashup.service";
import {lastValueFrom, Observable} from "rxjs";
import {Mashup} from "./models/mashup";
import {MashupShop} from "./models/mashup-shop";
import {Identifier} from "./models/identifier";
import {FilterButtonComponent} from "ngx-chayns-components";

@Component({
  selector: 'smp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mashup: Mashup | null = null;
  adminMode = chayns.env.user.adminMode;
  selectedTagIds: string[] = [];
  allTagsSelected: boolean = true;
  initialLoading: boolean = true;
  mashupId!: string;

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
        this.getMashup();
      }
    });
  }

  async getMashup() {
    this.mashup = await lastValueFrom(this.mashupService.getMashup(this.mashupId));
    if (this.initialLoading) {
      this.selectedTagIds = this.mashup.tags.map(tag => tag.id);
      this.initialLoading = false;
    }
  }

  newShopAdded(shop: MashupShop) {
    this.getMashup();
  }

  identify(index: number, item: Identifier): string {
    return item.id;
  }

  tagSelectionChanged(chips: FilterButtonComponent[]): void {
    this.selectedTagIds = chips.map(chip => chip.id);
    if (this.selectedTagIds.length === this.mashup?.tags.length) {
      this.allTagsSelected = true;
    } else {
      this.allTagsSelected = false;
    }
  }
}
