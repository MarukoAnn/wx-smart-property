import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayCouponComponent } from './chargepay-coupon.component';

describe('ChargepayCouponComponent', () => {
  let component: ChargepayCouponComponent;
  let fixture: ComponentFixture<ChargepayCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
