import { TestBed } from '@angular/core/testing';

import { MineDeputyService } from './mine-deputy.service';

describe('MineDeputyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineDeputyService = TestBed.get(MineDeputyService);
    expect(service).toBeTruthy();
  });
});
