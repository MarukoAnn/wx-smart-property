import { TestBed } from '@angular/core/testing';

import { ChargepayRoomTenantService } from './chargepay-room-tenant.service';

describe('ChargepayRoomTenantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargepayRoomTenantService = TestBed.get(ChargepayRoomTenantService);
    expect(service).toBeTruthy();
  });
});
