import {Identifier} from "./identifier";
import {Mashup} from "./mashup";

export type WriteMashupShop = Pick<MashupShop, 'name' | 'showName' | 'linkedUrl' | 'disabled' | 'locationId' | 'linkedTappId'>;

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
