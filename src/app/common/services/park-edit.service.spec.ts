import { TestBed } from '@angular/core/testing';

import { ParkEditService } from './park-edit.service';

describe('ParkEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkEditService = TestBed.get(ParkEditService);
    expect(service).toBeTruthy();
  });
});
