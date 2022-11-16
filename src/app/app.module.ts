import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxChaynsComponentsModule} from "ngx-chayns-components";
import {CpsAppHelperModule, CpsAppHelperService} from "cps-app-helper";
import {ShopConfigComponent} from './shop-config/shop-config.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FileUploadComponent} from './file-upload/file-upload.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {ShopTileComponent} from './shop-tile/shop-tile.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {TagConfigComponent} from './tag-config/tag-config.component';
import {ShopFilterPipe} from './pipes/shop-filter.pipe';
import {ShopOrderPipe} from './pipes/shop-order.pipe';
import {DatePipe} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {ShopOpenStatusPipe} from './pipes/shop-open-status.pipe';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    ShopConfigComponent,
    FileUploadComponent,
    ShopTileComponent,
    TagConfigComponent,
    ShopFilterPipe,
    ShopOrderPipe,
    ShopOpenStatusPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,

    CpsAppHelperModule.initializeApp(environment.applicationId),
    NgxChaynsComponentsModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    CpsAppHelperService,
    ShopFilterPipe,
    ShopOrderPipe,
    DatePipe,
    ShopOpenStatusPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
