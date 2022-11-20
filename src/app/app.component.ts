import {Component, OnInit} from '@angular/core';
import {CpsAppHelperService} from "cps-app-helper";
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
export class AppComponent {

  constructor(private cpsAppHelper: CpsAppHelperService) {
    cpsAppHelper.loadAppInstance();
  }

}
