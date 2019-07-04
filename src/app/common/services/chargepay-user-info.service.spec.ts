import { TestBed } from '@angular/core/testing';

import { ChargepayUserInfoService } from './chargepay-user-info.service';

describe('ChargepayUserInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargepayUserInfoService = TestBed.get(ChargepayUserInfoService);
    expect(service).toBeTruthy();
  });
});
