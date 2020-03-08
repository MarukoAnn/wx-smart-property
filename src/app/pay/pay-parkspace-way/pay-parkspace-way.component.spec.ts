import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayParkspaceWayComponent } from './pay-parkspace-way.component';

describe('PayParkspaceWayComponent', () => {
  let component: PayParkspaceWayComponent;
  let fixture: ComponentFixture<PayParkspaceWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayParkspaceWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayParkspaceWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
