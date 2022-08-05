import {MashupShop} from "./mashup-shop";
import {Tag} from "./tag";

export interface Mashup {
  id: string;
  path: string;
  createdAt: string;
  lastUpdatedAt: string;
  shops: MashupShop[];
  tags: Tag[];
}
