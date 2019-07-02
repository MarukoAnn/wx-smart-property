import { TestBed } from '@angular/core/testing';

import { ChargeMonthService } from './charge-month.service';

describe('ChargeMonthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargeMonthService = TestBed.get(ChargeMonthService);
    expect(service).toBeTruthy();
  });
});
