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
  feedback?: MashupShopFeedback;
}

export interface MashupShopLiveData {
  open: boolean;
  openFrom?: string;
  processors: MashupShopProcessor[];
}

export interface MashupShopProcessor {
  id: number;
  name: string;
  type: MashupShopProcessorType;
  open: boolean;
  deliveryTime: number;
  disabled: boolean;
}

export enum MashupShopProcessorType {
  delivery = 4,
  pickUp = 8
}

export interface MashupShopFeedback {
  from: Date;
  to: Date;
  average: number;
  totalAmount: number;
  details: {key: string, value: number}[];
}
