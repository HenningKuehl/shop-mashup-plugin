import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxChaynsComponentsModule} from "ngx-chayns-components";
import {CpsAppHelperModule, CpsAppHelperService} from "cps-app-helper";
import { ShopConfigComponent } from './shop-config/shop-config.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { environment } from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { ShopTileComponent } from './shop-tile/shop-tile.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { TagConfigComponent } from './tag-config/tag-config.component';
import { ShopFilterPipe } from './shop-filter.pipe';
import { ShopOrderPipe } from './shop-order.pipe';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ShopConfigComponent,
    FileUploadComponent,
    ShopTileComponent,
    TagConfigComponent,
    ShopFilterPipe,
    ShopOrderPipe,
  ],
  imports: [
    BrowserModule,
    NgxChaynsComponentsModule,
    CpsAppHelperModule.initializeApp(environment.applicationId),
    ReactiveFormsModule,
    HttpClientModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    CpsAppHelperService,
    ShopFilterPipe,
    ShopOrderPipe,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
