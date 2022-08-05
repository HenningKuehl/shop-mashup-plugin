import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MashupShopService} from "../services/mashup-shop.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'smp-shop-config',
  templateUrl: './shop-config.component.html',
  styleUrls: ['./shop-config.component.scss']
})
export class ShopConfigComponent implements OnInit {
  shopForm = this.fb.group({
    branchId: ['', Validators.required],
    name: ['', Validators.required],
    showName: [''],
    linkedUrl: [''],
    disabled: [false, Validators.required]
  })

  constructor(private fb: FormBuilder, private mashupShopService: MashupShopService) { }

  ngOnInit(): void {
  }

  async addOrSaveShop() {
    console.log(this.shopForm.value);
    chayns.showWaitCursor();
    const mashupShop = await lastValueFrom(this.mashupShopService.addNewShop(Number(this.shopForm.value.branchId), {
      name: this.shopForm.value.name || '',
      showName: this.shopForm.value.showName || '',
      linkedUrl: this.shopForm.value.linkedUrl || '',
      disabled: this.shopForm.value.disabled || false
    }));
    console.log('added new mashup', mashupShop);
    chayns.hideWaitCursor();
  }

}
