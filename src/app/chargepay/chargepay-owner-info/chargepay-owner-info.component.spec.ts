import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayOwnerInfoComponent } from './chargepay-owner-info.component';

describe('ChargepayOwnerInfoComponent', () => {
  let component: ChargepayOwnerInfoComponent;
  let fixture: ComponentFixture<ChargepayOwnerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayOwnerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
