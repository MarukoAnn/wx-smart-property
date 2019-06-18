import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDeputyChangeInfoComponent } from './mine-deputy-change-info.component';

describe('MineDeputyChangeInfoComponent', () => {
  let component: MineDeputyChangeInfoComponent;
  let fixture: ComponentFixture<MineDeputyChangeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDeputyChangeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDeputyChangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
