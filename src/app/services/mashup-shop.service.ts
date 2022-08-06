import {Injectable} from '@angular/core';
import {MashupShop, WriteMashupShop} from "../models/mashup-shop";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApiResult} from "../models/api-result";

@Injectable({
  providedIn: 'root'
})
export class MashupShopService {

  constructor(private http: HttpClient) {
  }

  addNewShop(mashupId: string, branchId: number, data: WriteMashupShop): Observable<MashupShop> {
    // TODO: add authorization to api service
    const headers = {
      'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`,
      'Content-Type': 'application/json'
    };
    return this.http
      .post<ApiResult<MashupShop>>(
        `https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops`,
        {
          data,
          branchId
        },
        {headers}
      )
      .pipe(map(res => {
        return res.data;
      }));
  }

  updateShop(mashupId: string, branchId: number, data: WriteMashupShop): Observable<MashupShop> {
    // TODO: add authorization to api service
    const headers = {
      'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`,
      'Content-Type': 'application/json'
    };
    return this.http
      .put<ApiResult<MashupShop>>(
        `https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${branchId}`,
        {
          ...data
        },
        {headers}
      )
      .pipe(map(res => {
        return res.data;
      }));
  }

  deleteShop(mashupId: string, branchId: number): Observable<ApiResult<{}>> {
    // TODO: add authorization to api service
    const headers = {
      'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`,
      'Content-Type': 'application/json'
    };
    return this.http
      .delete<ApiResult<{}>>(
        `https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${branchId}`,
        {headers}
      );
  }
}
