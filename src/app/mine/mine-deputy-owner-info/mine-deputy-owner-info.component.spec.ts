import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDeputyOwnerInfoComponent } from './mine-deputy-owner-info.component';

describe('MineDeputyOwnerInfoComponent', () => {
  let component: MineDeputyOwnerInfoComponent;
  let fixture: ComponentFixture<MineDeputyOwnerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDeputyOwnerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDeputyOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
