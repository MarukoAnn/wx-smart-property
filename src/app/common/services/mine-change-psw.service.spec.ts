import { TestBed } from '@angular/core/testing';

import { MineChangePswService } from './mine-change-psw.service';

describe('MineChangePswService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineChangePswService = TestBed.get(MineChangePswService);
    expect(service).toBeTruthy();
  });
});
