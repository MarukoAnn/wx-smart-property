import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDeputyAddComponent } from './mine-deputy-add.component';

describe('MineDeputyAddComponent', () => {
  let component: MineDeputyAddComponent;
  let fixture: ComponentFixture<MineDeputyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDeputyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDeputyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
