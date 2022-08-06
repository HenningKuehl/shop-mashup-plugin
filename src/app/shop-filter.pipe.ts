import { Pipe, PipeTransform } from '@angular/core';
import {MashupShop} from "./models/mashup-shop";

@Pipe({
  name: 'shopFilter'
})
export class ShopFilterPipe implements PipeTransform {

  transform(shops: MashupShop[], selectedTagIds: string[], allTagsSelected: boolean): MashupShop[] {
    if (allTagsSelected) {
      return shops;
    }
    return shops.filter(shop => shop.tagRefs.map(ref => ref.id).some(tagId => selectedTagIds.includes(tagId)));
  }

}
