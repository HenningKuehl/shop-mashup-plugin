import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResult} from "../models/api-result";
import {Mashup} from "../models/mashup";
import {BehaviorSubject, lastValueFrom, map, Observable, ReplaySubject, tap} from "rxjs";
import {Tag} from "../models/tag";
import {MashupShop, MashupShopLiveData} from "../models/mashup-shop";

@Injectable({
  providedIn: 'root'
})
export class MashupService {
  private baseApiUrl = 'https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api';
  tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  shops: BehaviorSubject<MashupShop[]> = new BehaviorSubject<MashupShop[]>([]);
  mashup: ReplaySubject<Mashup> = new ReplaySubject<Mashup>(1);

  constructor(private http: HttpClient) {
  }

  async loadMashup(mashupId: string) {
    // TODO: get mashupId by cps-apps-helper
    await lastValueFrom(this.http
      .get<ApiResult<Mashup>>(
        `${this.baseApiUrl}/mashups/${mashupId}?live=false`
      )
      .pipe(
        map(res => res.data),
        tap(mashup => {
          this.mashup.next(mashup);
          this.tags.next(mashup.tags);
          this.shops.next(mashup.shops);
        })
      ));
  }

  addTag(mashupId: string, name: string): Observable<Tag> {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http
      .post<ApiResult<Tag>>(
        `${this.baseApiUrl}/mashups/${mashupId}/tags`,
        {name},
        {headers}
      )
      .pipe(map(res => res.data));
  }

  updateTag(mashupId: string, tagId: string, name: string): Observable<Tag> {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http
      .put<ApiResult<Tag>>(
        `${this.baseApiUrl}/mashups/${mashupId}/tags/${tagId}`,
        {name},
        {headers}
      )
      .pipe(map(res => res.data));
  }

  deleteTag(mashupId: string, tagId: string): Observable<ApiResult<{}>> {
    return this.http
      .delete<ApiResult<{}>>(
        `${this.baseApiUrl}/mashups/${mashupId}/tags/${tagId}`
      );
  }

  async updateTagsForShop(
    mashupId: string,
    shopId: string,
    addedTagIds: string[],
    removedTagIds: string[]
  ): Promise<MashupShop> {
    const headers = {
      'Content-Type': 'application/json',
    }

    const promises: Promise<MashupShop>[] = [];

    addedTagIds.forEach(tagId => {
      promises.push(
        lastValueFrom(
          this.http
            .post<ApiResult<MashupShop>>(
              `${this.baseApiUrl}/mashups/${mashupId}/shops/${shopId}/tags/${tagId}`,
              {},
              {headers}
            )
            .pipe(map(res => res.data))
        )
      )
    });

    removedTagIds.forEach(tagId => {
      promises.push(
        lastValueFrom(
          this.http
            .delete<ApiResult<MashupShop>>(
              `${this.baseApiUrl}/mashups/${mashupId}/shops/${shopId}/tags/${tagId}`
            )
            .pipe(map(res => res.data))
        )
      )
    })

    const mashupShops = await Promise.all(promises);
    return mashupShops[mashupShops.length - 1];
  }

  updateMashupShopLiveData(shopId: string, data: MashupShop): void {
    const shops = this.shops.getValue();
    const shop = shops.find(shop => shop.id === shopId);
    if (!shop) {
      return;
    }
    shop.live = data.live;
    shop.feedback = data.feedback;
    this.shops.next([...shops]);
  }
}
