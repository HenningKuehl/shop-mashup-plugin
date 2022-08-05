import {Component, OnInit} from '@angular/core';
import {CpsAppHelperService} from "cps-app-helper";
import {environment} from "../environments/environment";
import {MashupService} from "./services/mashup.service";
import {lastValueFrom, Observable} from "rxjs";
import {Mashup} from "./models/mashup";

@Component({
  selector: 'smp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mashup: Mashup | null = null;

  constructor(private cpsAppHelper: CpsAppHelperService, private mashupService: MashupService) {
  }

  ngOnInit() {
    this.getMashup();
    this.cpsAppHelper.authenticate({
      appId: environment.applicationId,
      tappId: chayns.env.site.tapp.id,
      siteId: chayns.env.site.id,
      token: chayns.env.user.tobitAccessToken,
    }).then(authenticated => {
      console.log(authenticated);
    }).catch(err => {
      console.error(err);
    });
  }

  private async getMashup() {
    console.log('get mashup');
    this.mashup = await lastValueFrom(this.mashupService.getMashup());
  }
}
