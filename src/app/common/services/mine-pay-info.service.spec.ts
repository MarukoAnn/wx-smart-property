import { TestBed } from '@angular/core/testing';

import { MinePayInfoService } from './mine-pay-info.service';

describe('MinePayInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinePayInfoService = TestBed.get(MinePayInfoService);
    expect(service).toBeTruthy();
  });
});
