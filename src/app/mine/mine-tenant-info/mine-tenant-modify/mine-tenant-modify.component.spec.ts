import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTenantModifyComponent } from './mine-tenant-modify.component';

describe('MineTenantModifyComponent', () => {
  let component: MineTenantModifyComponent;
  let fixture: ComponentFixture<MineTenantModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineTenantModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineTenantModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
