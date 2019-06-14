import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineOwerPayInfoComponent } from './mine-ower-pay-info.component';

describe('MineOwerPayInfoComponent', () => {
  let component: MineOwerPayInfoComponent;
  let fixture: ComponentFixture<MineOwerPayInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineOwerPayInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineOwerPayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
