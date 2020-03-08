import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargepayParkspaceEditComponent } from './chargepay-parkspace-edit.component';

describe('ChargepayParkspaceEditComponent', () => {
  let component: ChargepayParkspaceEditComponent;
  let fixture: ComponentFixture<ChargepayParkspaceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargepayParkspaceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargepayParkspaceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
