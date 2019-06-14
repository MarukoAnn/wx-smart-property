import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayMonthComponent } from './chargepay-month.component';

describe('ChargepayMonthComponent', () => {
  let component: ChargepayMonthComponent;
  let fixture: ComponentFixture<ChargepayMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
