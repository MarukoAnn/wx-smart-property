import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineChagePasswordComponent } from './mine-chage-password.component';

describe('MineChagePasswordComponent', () => {
  let component: MineChagePasswordComponent;
  let fixture: ComponentFixture<MineChagePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineChagePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineChagePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
