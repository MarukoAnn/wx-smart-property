import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinePersionChangeUsernameComponent } from './mine-persion-change-username.component';

describe('MinePersionChangeUsernameComponent', () => {
  let component: MinePersionChangeUsernameComponent;
  let fixture: ComponentFixture<MinePersionChangeUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePersionChangeUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinePersionChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
