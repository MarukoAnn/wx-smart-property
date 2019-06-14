import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDetailComponent } from './pay-detail.component';

describe('PayDetailComponent', () => {
  let component: PayDetailComponent;
  let fixture: ComponentFixture<PayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
