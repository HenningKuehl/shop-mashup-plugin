import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxChaynsComponentsModule} from "ngx-chayns-components";
import {CpsAppHelperComponent, CpsAppHelperModule, CpsAppHelperService} from "cps-app-helper";
import { ShopConfigComponent } from './shop-config/shop-config.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ShopConfigComponent,
  ],
  imports: [
    BrowserModule,
    NgxChaynsComponentsModule,
    CpsAppHelperModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CpsAppHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
