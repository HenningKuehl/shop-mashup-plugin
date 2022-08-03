import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxChaynsComponentsModule} from "ngx-chayns-components";
import {CpsAppHelperComponent, CpsAppHelperModule, CpsAppHelperService} from "cps-app-helper";
import { ShopConfigComponent } from './shop-config/shop-config.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

@NgModule({
  declarations: [
    AppComponent,
    ShopConfigComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    NgxChaynsComponentsModule,
    CpsAppHelperModule,
    ReactiveFormsModule,
    HttpClientModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    CpsAppHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
