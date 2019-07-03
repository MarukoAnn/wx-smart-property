import { TestBed } from '@angular/core/testing';

import { PayWayService } from './pay-way.service';

describe('PayWayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayWayService = TestBed.get(PayWayService);
    expect(service).toBeTruthy();
  });
});
