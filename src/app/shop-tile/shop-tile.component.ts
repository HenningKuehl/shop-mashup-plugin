import {Component, Input, OnInit} from '@angular/core';
import {MashupShop} from "../models/mashup-shop";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, firstValueFrom, lastValueFrom} from "rxjs";

@Component({
  selector: 'smp-shop-tile',
  templateUrl: './shop-tile.component.html',
  styleUrls: ['./shop-tile.component.scss']
})
export class ShopTileComponent implements OnInit {
  // TODO: get mashupId via service
  @Input() mashupId!: string;
  @Input() shop!: MashupShop;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  getTags(): string[] {
    // TODO: load tags from service
    return ['Pizza', 'Döner', 'Salat']
  }

  clickTile() {
    if (this.shop.linkedUrl) {
      window.open(this.shop.linkedUrl, '_blank');
    }
  }

}
