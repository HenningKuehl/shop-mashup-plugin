import {Pipe, PipeTransform} from '@angular/core';
import {MashupShop} from "./models/mashup-shop";

@Pipe({
  name: 'shopFilter'
})
export class ShopFilterPipe implements PipeTransform {

  transform(shops: MashupShop[] | null, selectedTagIds: string[], allTagsSelected: boolean): MashupShop[] {
    if (!shops) {
      return [];
    }
    if (allTagsSelected) {
      return shops.filter(shop => !shop.disabled);
    }
    return shops.filter(shop => shop.tagRefs.map(ref => ref.id).some(tagId => selectedTagIds.includes(tagId)) && !shop.disabled);
  }

}
