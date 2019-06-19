import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTenantAddComponent } from './mine-tenant-add.component';

describe('MineTenantAddComponent', () => {
  let component: MineTenantAddComponent;
  let fixture: ComponentFixture<MineTenantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineTenantAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineTenantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
