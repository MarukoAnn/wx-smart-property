import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../common/services/global.service';
import {HeaderContent} from '../../../common/components/header/header.model';
import {blobToDataURL, dataURLtoFile, noHeaderBase64DataToBlob} from '../../../common/tools/readBlobAsDataURL';
import {MineImageCropperService} from '../../../common/services/mine-image-cropper.service';
import {ToastComponent, ToptipsComponent, ToptipsService} from 'ngx-weui';
declare const wx: any;
@Component({
  selector: 'app-mine-image-cropper',
  templateUrl: './mine-image-cropper.component.html',
  styleUrls: ['./mine-image-cropper.component.less']
})
export class MineImageCropperComponent implements OnInit{
  // @ViewChild('toptips') toptips: ToptipsComponent;
  @ViewChild('success') success: ToastComponent;

  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public imgfile: any;
  public headerOption: HeaderContent = {
    title: '图片裁剪',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public loading_show = true;
  constructor(
    private getRouter: ActivatedRoute,
    private globalSrv: GlobalService,
    private mineImgSrv: MineImageCropperService,
    private toptipSrv: ToptipsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.imageChangedEvent = 'data:image/jpg;base64,' + this.globalSrv.wxSessionGetObject('id');
  }
  // upload image
  public mineImageUpalodClick (): void {
    const files = new FormData();
    files.append('file', this.imgfile);
    this.loading_show = false;
    this.mineImgSrv.uploadImage(files).subscribe(
      (value) => {
          this.loading_show = true;
          // this.imageChangedEvent = null;
          this.onShow('success', '修改成功');
          // this.router.navigate(['/tab/mine']);
    }
    );
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imgfile =  this.dataURLtoFile(this.croppedImage, 'header.png');
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
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  private  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    // @ts-ignore
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
    // return new Blob([u8arr], { type: mime });

  }
  //  public  blobToFile(theBlob, fileName) {
  //   theBlob.lastModifiedDate = new Date();
  //   theBlob.name = fileName;
  //   return theBlob;
  // }
  public  backHome(): void {
    window.history.back();
  }
}
