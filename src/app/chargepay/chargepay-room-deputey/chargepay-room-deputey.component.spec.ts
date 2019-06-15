import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayRoomDeputeyComponent } from './chargepay-room-deputey.component';

describe('ChargepayRoomDeputeyComponent', () => {
  let component: ChargepayRoomDeputeyComponent;
  let fixture: ComponentFixture<ChargepayRoomDeputeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayRoomDeputeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayRoomDeputeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
