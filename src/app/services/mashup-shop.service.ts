import {Injectable} from '@angular/core';
import {MashupShop, MashupShopLiveData, WriteMashupShop} from "../models/mashup-shop";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {ApiResult} from "../models/api-result";
import {MashupService} from "./mashup.service";

@Injectable({
  providedIn: 'root'
})
export class MashupShopService {

  constructor(private http: HttpClient, private mashupService: MashupService) {
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

  disableShop(mashupId: string, branchId: number): Observable<MashupShop> {
    // TODO: add authorization to api service
    const headers = {
      'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`,
      'Content-Type': 'application/json'
    };
    return this.http
      .patch<ApiResult<MashupShop>>(
        `https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${branchId}/disable`,
        {headers}
      )
      .pipe(map(res => res.data));
  }

  enableShop(mashupId: string, branchId: number): Observable<MashupShop> {
    // TODO: add authorization to api service
    const headers = {
      'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`,
      'Content-Type': 'application/json'
    };
    return this.http
      .patch<ApiResult<MashupShop>>(
        `https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${branchId}/enable`,
        {headers}
      )
      .pipe(map(res => res.data));
  }

  getLiveData(mashupId: string, branchId: number): Observable<MashupShopLiveData | undefined> {
    // TODO: add authorization to api service
    const headers = {
      'Authorization': `Bearer ${chayns.env.user.tobitAccessToken}`,
      'Content-Type': 'application/json'
    };
    return this.http
      .get<ApiResult<MashupShop>>(
        `https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${branchId}?live=true`,
        {headers}
      )
      .pipe(
        map(res => res.data.live),
        tap(live => {
          if (live) {
            this.mashupService.updateMashupShopLiveData(`${branchId}`, live)
          }
        })
      );
  }
}
