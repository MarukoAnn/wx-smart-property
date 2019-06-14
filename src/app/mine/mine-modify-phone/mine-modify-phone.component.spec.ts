import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineModifyPhoneComponent } from './mine-modify-phone.component';

describe('MineModifyPhoneComponent', () => {
  let component: MineModifyPhoneComponent;
  let fixture: ComponentFixture<MineModifyPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineModifyPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineModifyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
