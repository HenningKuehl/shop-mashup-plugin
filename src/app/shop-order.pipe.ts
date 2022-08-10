import { Pipe, PipeTransform } from '@angular/core';
import {MashupShop} from "./models/mashup-shop";

@Pipe({
  name: 'shopOrder'
})
export class ShopOrderPipe implements PipeTransform {

  transform(shops: MashupShop[] | null): MashupShop[] {
    if (!shops) {
      return [];
    }
    return shops.sort((a, b) => a.live?.open === b.live?.open ? 0 : a.live?.open ? -1 : 1);
  }

}
