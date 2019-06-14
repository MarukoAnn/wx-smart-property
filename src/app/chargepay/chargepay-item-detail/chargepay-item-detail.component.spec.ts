import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayItemDetailComponent } from './chargepay-item-detail.component';

describe('ChargepayItemDetailComponent', () => {
  let component: ChargepayItemDetailComponent;
  let fixture: ComponentFixture<ChargepayItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
