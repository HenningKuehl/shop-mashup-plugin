export interface MashupShop {
  name: string;
  showName?: string;
  linkedUrl?: string;
  linkedTappId?: number;
  disabled: boolean;
  live?: MashupShopLiveData;
}

export interface MashupShopLiveData {
  open: boolean;
  processors: MashupShopProcessor[];
}

export interface MashupShopProcessor {
  name: string;
  type: MashupShopProcessorType;
  open: boolean;
  deliveryTime: number;
}

export enum MashupShopProcessorType {
  delivery = 4,
  pickUp = 8
}
