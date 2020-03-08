import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayParkspaceListComponent } from './chargepay-parkspace-list.component';

describe('ChargepayParkspaceListComponent', () => {
  let component: ChargepayParkspaceListComponent;
  let fixture: ComponentFixture<ChargepayParkspaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayParkspaceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayParkspaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
