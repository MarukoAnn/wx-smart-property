import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineChangePasswordComponent } from './mine-change-password.component';

describe('MineChangePasswordComponent', () => {
  let component: MineChangePasswordComponent;
  let fixture: ComponentFixture<MineChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
