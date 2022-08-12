import {Identifier} from "./identifier";

export type WriteMashupShop = Pick<MashupShop, 'name' | 'showName' | 'linkedUrl' | 'disabled' | 'locationId' | 'linkedTappId' | 'iconStoragePath' | 'backgroundStoragePath'>;

export interface MashupShop extends Identifier {
  name: string;
  showName: string;
  linkedUrl: string;
  linkedTappId: number;
  disabled: boolean;
  iconUrl: string;
  backgroundUrl: string;
  tagRefs: Identifier[];
  live?: MashupShopLiveData;
  locationId: number;
  iconStoragePath?: string;
  backgroundStoragePath?: string;
}

export interface MashupShopLiveData {
  open: boolean;
  openFrom?: string;
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
