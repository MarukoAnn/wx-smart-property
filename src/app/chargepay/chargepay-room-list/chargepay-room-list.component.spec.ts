import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayRoomListComponent } from './chargepay-room-list.component';

describe('ChargepayRoomListComponent', () => {
  let component: ChargepayRoomListComponent;
  let fixture: ComponentFixture<ChargepayRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
