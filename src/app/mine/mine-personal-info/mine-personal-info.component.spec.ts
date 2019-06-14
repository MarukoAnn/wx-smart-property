import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinePersonalInfoComponent } from './mine-personal-info.component';

describe('MinePersonalInfoComponent', () => {
  let component: MinePersonalInfoComponent;
  let fixture: ComponentFixture<MinePersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinePersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
