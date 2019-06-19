import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTenantDetailComponent } from './mine-tenant-detail.component';

describe('MineTenantDetailComponent', () => {
  let component: MineTenantDetailComponent;
  let fixture: ComponentFixture<MineTenantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineTenantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineTenantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
