import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayRoomTenantComponent } from './chargepay-room-tenant.component';

describe('ChargepayRoomTenantComponent', () => {
  let component: ChargepayRoomTenantComponent;
  let fixture: ComponentFixture<ChargepayRoomTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayRoomTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayRoomTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
