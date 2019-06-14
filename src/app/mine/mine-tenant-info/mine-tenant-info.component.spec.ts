import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTenantInfoComponent } from './mine-tenant-info.component';

describe('MineTenantInfoComponent', () => {
  let component: MineTenantInfoComponent;
  let fixture: ComponentFixture<MineTenantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineTenantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineTenantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
