import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDeputyOwerInfoComponent } from './mine-deputy-ower-info.component';

describe('MineDeputyOwerInfoComponent', () => {
  let component: MineDeputyOwerInfoComponent;
  let fixture: ComponentFixture<MineDeputyOwerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDeputyOwerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDeputyOwerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
