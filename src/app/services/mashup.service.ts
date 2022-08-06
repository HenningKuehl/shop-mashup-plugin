import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResult} from "../models/api-result";
import {Mashup} from "../models/mashup";
import {BehaviorSubject, lastValueFrom, map, Observable, tap} from "rxjs";
import {Tag} from "../models/tag";
import {MashupShop} from "../models/mashup-shop";

@Injectable({
  providedIn: 'root'
})
export class MashupService {
  tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  shops: BehaviorSubject<MashupShop[]> = new BehaviorSubject<MashupShop[]>([]);

  constructor(private http: HttpClient) {
  }

  getMashup(): Observable<Mashup> {
    // TODO: get mashupId by cps-apps-helper
    return this.http
      .get<ApiResult<Mashup>>('https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/Od47KnbvU3ELvk4l88Zb?live=true')
      .pipe(
        map(res => res.data),
        tap(mashup => {
          this.tags.next(mashup.tags);
          this.shops.next(mashup.shops);
        })
      );
  }

  addTag(mashupId: string, name: string): Observable<Tag> {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http
      .post<ApiResult<Tag>>(`https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/tags`, {name}, {headers})
      .pipe(map(res => res.data));
  }

  updateTag(mashupId: string, tagId: string, name: string): Observable<Tag> {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http
      .put<ApiResult<Tag>>(`https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/tags/${tagId}`, {name}, {headers})
      .pipe(map(res => res.data));
  }

  deleteTag(mashupId: string, tagId: string): Observable<ApiResult<{}>> {
    return this.http
      .delete<ApiResult<{}>>(`https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/tags/${tagId}`);
  }

  async updateTagsForShop(mashupId: string, shopId: string, addedTagIds: string[], removedTagIds: string[]): Promise<MashupShop> {
    const headers = {
      'Content-Type': 'application/json',
    }

    const promises: Promise<MashupShop>[] = [];

    addedTagIds.forEach(tagId => {
      promises.push(
        lastValueFrom(
          this.http
            .post<ApiResult<MashupShop>>(`https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${shopId}/tags/${tagId}`, {}, {headers})
            .pipe(map(res => res.data))
        )
      )
    });

    removedTagIds.forEach(tagId => {
      promises.push(
        lastValueFrom(
          this.http
            .delete<ApiResult<MashupShop>>(`https://shop-mashup-api-http-i7gk2vokkq-ez.a.run.app/api/mashups/${mashupId}/shops/${shopId}/tags/${tagId}`)
            .pipe(map(res => res.data))
        )
      )
    })

    const mashupShops = await Promise.all(promises);
    return mashupShops[mashupShops.length - 1];
  }
}
