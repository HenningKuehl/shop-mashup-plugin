import {Injectable} from '@angular/core';
import {MashupShop} from "../models/mashup-shop";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApiResult} from "../models/api-result";

@Injectable({
  providedIn: 'root'
})
export class MashupShopService {

  constructor(private http: HttpClient) {
  }

  addNewShop(branchId: number, data: MashupShop): Observable<MashupShop> {
    // TODO: get mashup id
    const mashupId = '';
    // TODO: add authorization to api service
    return this.http.post<ApiResult<MashupShop>>(`https://cps-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops`, {
      data,
      branchId
    }, {headers: {'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`}}).pipe(map(res => {
      return res.data;
    }));
  }
}
