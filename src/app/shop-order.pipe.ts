import {Pipe, PipeTransform} from '@angular/core';
import {MashupShop, MashupShopProcessorType} from "./models/mashup-shop";
import {ShopOrderType} from "./models/shop-order-type";

@Pipe({
  name: 'shopOrder'
})
export class ShopOrderPipe implements PipeTransform {

  transform(shops: MashupShop[] | null, orderType: ShopOrderType): MashupShop[] {
    console.log('shop order pipe', shops);
    if (!shops) {
      return [];
    }
    switch (orderType) {
      case ShopOrderType.deliveryTime:
        return shops.sort((a, b) => {
          const deliveryProcessorA = a.live?.processors.find(p => p.type === MashupShopProcessorType.delivery);
          const deliveryProcessorB = b.live?.processors.find(p => p.type === MashupShopProcessorType.delivery);
          if (deliveryProcessorA && a.live?.open && deliveryProcessorB && b.live?.open) {
            return deliveryProcessorA.deliveryTime - deliveryProcessorB.deliveryTime;
          }
          if (deliveryProcessorA && a.live?.open && !deliveryProcessorB) {
            return -1;
          }
          if (deliveryProcessorB && b.live?.open && !deliveryProcessorA) {
            return 1;
          }
          return this.defaultOrder(a, b);
        });

      case ShopOrderType.pickUpTime:
        return shops.sort((a, b) => {
          const pickUpProcessorA = a.live?.processors.find(p => p.type === MashupShopProcessorType.pickUp);
          const pickUpProcessorB = b.live?.processors.find(p => p.type === MashupShopProcessorType.pickUp);
          if (pickUpProcessorA && a.live?.open && pickUpProcessorB && b.live?.open) {
            return pickUpProcessorA.deliveryTime - pickUpProcessorB.deliveryTime;
          }
          if (pickUpProcessorA && a.live?.open && !pickUpProcessorB) {
            return -1;
          }

          if (pickUpProcessorB && b.live?.open && !pickUpProcessorA) {
            return 1;
          }
          return this.defaultOrder(a, b);
        });

      case ShopOrderType.name:
        return shops.sort((a, b) => {
          const nameA = (a.showName || a.name).toUpperCase(); // ignore upper and lowercase
          const nameB = (b.showName || b.name).toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

      case ShopOrderType.openStatus:
      default:
        return shops.sort(this.defaultOrder);
    }
  }

  private defaultOrder(a: MashupShop, b: MashupShop): number {
    return a.live?.open === b.live?.open ? 0 : a.live?.open ? -1 : 1;
  }

}
