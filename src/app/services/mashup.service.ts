import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResult} from "../models/api-result";
import {Mashup} from "../models/mashup";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MashupService {

  constructor(private http: HttpClient) {
  }

  getMashup(): Observable<Mashup> {
    // TODO: get mashupId by cps-apps-helper
    return this.http.get<ApiResult<Mashup>>('https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/Od47KnbvU3ELvk4l88Zb?live=true')
      .pipe(map(res => res.data));
  }
}
