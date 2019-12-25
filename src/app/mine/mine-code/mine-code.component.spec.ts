import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineCodeComponent } from './mine-code.component';

describe('MineCodeComponent', () => {
  let component: MineCodeComponent;
  let fixture: ComponentFixture<MineCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
