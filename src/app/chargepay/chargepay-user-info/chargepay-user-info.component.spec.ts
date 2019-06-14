import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayUserInfoComponent } from './chargepay-user-info.component';

describe('ChargepayUserInfoComponent', () => {
  let component: ChargepayUserInfoComponent;
  let fixture: ComponentFixture<ChargepayUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
