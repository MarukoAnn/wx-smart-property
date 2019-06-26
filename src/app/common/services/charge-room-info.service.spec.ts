import { TestBed } from '@angular/core/testing';

import { ChargeRoomInfoService } from './charge-room-info.service';

describe('ChargeRoomInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargeRoomInfoService = TestBed.get(ChargeRoomInfoService);
    expect(service).toBeTruthy();
  });
});
