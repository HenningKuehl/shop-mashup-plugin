import {Pipe, PipeTransform} from '@angular/core';
import {MashupShopLiveData} from "../models/mashup-shop";
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'shopOpenStatus'
})
export class ShopOpenStatusPipe implements PipeTransform {

  constructor(private date: DatePipe) {
  }

  transform(isOpen: boolean, liveData?: MashupShopLiveData): string {
    if (!isOpen && liveData) {
      if (!liveData.openFrom) {
        return 'Geschlossen';
      }

      const openFrom = new Date(liveData.openFrom);
      const now = new Date();

      if (
        openFrom.getDate() > now.getDate() ||
        openFrom.getMonth() > now.getMonth() ||
        openFrom.getFullYear() > now.getFullYear()
      ) {
        return 'Geschlossen';
      }

      return `Geöffnet ab ${this.date.transform(openFrom, 'HH:mm')} Uhr`;
    }

    return 'Bestellen';
  }
}
