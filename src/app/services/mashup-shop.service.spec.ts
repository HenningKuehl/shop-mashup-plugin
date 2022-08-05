import { TestBed } from '@angular/core/testing';

import { MashupShopService } from './mashup-shop.service';

describe('MashupShopService', () => {
  let service: MashupShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MashupShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
