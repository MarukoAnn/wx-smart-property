import { TestBed } from '@angular/core/testing';

import { MineTenantService } from './mine-tenant.service';

describe('MineTenantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineTenantService = TestBed.get(MineTenantService);
    expect(service).toBeTruthy();
  });
});
