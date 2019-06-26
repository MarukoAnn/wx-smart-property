import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineImageCropperComponent } from './mine-image-cropper.component';

describe('MineImageCropperComponent', () => {
  let component: MineImageCropperComponent;
  let fixture: ComponentFixture<MineImageCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineImageCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
