import {Component, OnInit} from '@angular/core';
import {CpsAppHelperService} from "cps-app-helper";
import {environment} from "../environments/environment";
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

  constructor(private cpsAppHelper: CpsAppHelperService, private mashupService: MashupService) {
  }

  ngOnInit() {
    this.getMashup();
    /*this.cpsAppHelper.authenticate({
      appId: environment.applicationId,
      tappId: chayns.env.site.tapp.id,
      siteId: chayns.env.site.id,
      token: chayns.env.user.tobitAccessToken,
    }).then(authenticated => {
      console.log(authenticated);
    }).catch(err => {
      console.error(err);
    });*/
  }

  async getMashup() {
    chayns.showWaitCursor();
    this.mashup = await lastValueFrom(this.mashupService.getMashup());
    chayns.hideWaitCursor();
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
