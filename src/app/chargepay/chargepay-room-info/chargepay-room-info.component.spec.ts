import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayRoomInfoComponent } from './chargepay-room-info.component';

describe('ChargepayRoomInfoComponent', () => {
  let component: ChargepayRoomInfoComponent;
  let fixture: ComponentFixture<ChargepayRoomInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayRoomInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayRoomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
