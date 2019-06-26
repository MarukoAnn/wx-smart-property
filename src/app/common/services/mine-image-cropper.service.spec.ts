import { TestBed } from '@angular/core/testing';

import { MineImageCropperService } from './mine-image-cropper.service';

describe('MineImageCropperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineImageCropperService = TestBed.get(MineImageCropperService);
    expect(service).toBeTruthy();
  });
});
