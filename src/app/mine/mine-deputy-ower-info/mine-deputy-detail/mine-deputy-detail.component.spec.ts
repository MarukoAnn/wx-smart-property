import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDeputyDetailComponent } from './mine-deputy-detail.component';

describe('MineDeputyDetailComponent', () => {
  let component: MineDeputyDetailComponent;
  let fixture: ComponentFixture<MineDeputyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDeputyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDeputyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
