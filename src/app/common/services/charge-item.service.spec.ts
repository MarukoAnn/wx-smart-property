import { TestBed } from '@angular/core/testing';

import { ChargeItemService } from './charge-item.service';

describe('ChargeItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargeItemService = TestBed.get(ChargeItemService);
    expect(service).toBeTruthy();
  });
});
