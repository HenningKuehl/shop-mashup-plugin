import {Component, Input, OnInit} from '@angular/core';
import {MashupShop} from "../models/mashup-shop";

@Component({
  selector: 'smp-shop-tile',
  templateUrl: './shop-tile.component.html',
  styleUrls: ['./shop-tile.component.scss']
})
export class ShopTileComponent implements OnInit {
  // TODO: get mashupId via service
  @Input() mashupId!: string;
  @Input() shop!: MashupShop;

  constructor() { }

  ngOnInit(): void {
  }

  getIconUrl(): string {
    // TODO: get firebase storage download url
    return 'https://tsimg.cloud/77890-14363/8a0f9b7086630d6a1a7363e6e2051226c77764f5_w72-h72.jpg';
  }

  getBackgroundUrl(): string {
    // TODO: get firebase storage download url
    return 'https://video.tsimg.space/93279-08823/f2692d22-4876-4927-a8d7-7381907c51b4.jpg';
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
