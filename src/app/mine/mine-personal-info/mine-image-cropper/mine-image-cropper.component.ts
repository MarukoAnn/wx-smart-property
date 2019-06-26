import { Component, OnInit } from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../common/services/global.service';

@Component({
  selector: 'app-mine-image-cropper',
  templateUrl: './mine-image-cropper.component.html',
  styleUrls: ['./mine-image-cropper.component.less']
})
export class MineImageCropperComponent implements OnInit {
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public imgfile: any;
  constructor(
    private getRouter: ActivatedRoute,
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {
    this.imageChangedEvent = this.globalSrv.wxSessionGetObject('file');
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
    this.imageChangedEvent = null;
    // console.log( this.croppedImage);
    // this.imgfile =  this.dataURLtoFile(this.croppedImage, 'img');
    console.log(this.imgfile);
  }
  imageLoaded(e) {
    console.log(e);
    // show cropper
  }
  cropperReady(e) {
    console.log(e);

    // cropper ready
  }
  loadImageFailed(e) {
    console.log(e);
    // show message
  }
  // private  dataURLtoFile(dataurl, filename) {
  //   const arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   // @ts-ignore
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  //   // return new Blob([u8arr], { type: mime });
  //
  // }
  //  public  blobToFile(theBlob, fileName) {
  //   theBlob.lastModifiedDate = new Date();
  //   theBlob.name = fileName;
  //   return theBlob;
  // }

}
