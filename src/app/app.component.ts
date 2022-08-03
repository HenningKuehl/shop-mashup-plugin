import {Component, OnInit} from '@angular/core';
import {CpsAppHelperService} from "cps-app-helper";
import {environment} from "../environments/environment";

@Component({
  selector: 'smp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private cpsAppHelper: CpsAppHelperService) {
  }

  ngOnInit() {
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
}
