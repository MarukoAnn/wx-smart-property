import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinePersionChangePhoneComponent } from './mine-persion-change-phone.component';

describe('MinePersionChangePhoneComponent', () => {
  let component: MinePersionChangePhoneComponent;
  let fixture: ComponentFixture<MinePersionChangePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePersionChangePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinePersionChangePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
