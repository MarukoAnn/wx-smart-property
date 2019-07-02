import { TestBed } from '@angular/core/testing';

import { MinePersionalInfoService } from './mine-persional-info.service';

describe('MinePersionalInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinePersionalInfoService = TestBed.get(MinePersionalInfoService);
    expect(service).toBeTruthy();
  });
});
