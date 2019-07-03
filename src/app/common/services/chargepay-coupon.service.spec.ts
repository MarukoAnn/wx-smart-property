import { TestBed } from '@angular/core/testing';

import { ChargepayCouponService } from './chargepay-coupon.service';

describe('ChargepayCouponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargepayCouponService = TestBed.get(ChargepayCouponService);
    expect(service).toBeTruthy();
  });
});
