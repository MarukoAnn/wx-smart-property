import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PopupComponent, ToastComponent} from 'ngx-weui';
import {GlobalService} from '../../common/services/global.service';
import {Router} from '@angular/router';
import {is_ios} from '../../common/tools/is_ios';
import {random_word} from '../../common/tools/random_word';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {MineImageCropperService} from '../../common/services/mine-image-cropper.service';
import {blobToDataURL, dataURLtoFile, noHeaderBase64DataToBlob} from '../../common/tools/readBlobAsDataURL';
import {ImageCroppedEvent} from 'ngx-image-cropper';

declare const wx: any;
@Component({
  selector: 'app-mine-personal-info',
  templateUrl: './mine-personal-info.component.html',
  styleUrls: ['./mine-personal-info.component.less']
})
export class MinePersonalInfoComponent implements OnInit {
  @ViewChild('photo') simplePopup: PopupComponent;
  @ViewChild('full') fullPopup: PopupComponent;
  @ViewChild('success') success: ToastComponent;
  public headerOption: HeaderContent = {
    title: '个人资料',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public imgfile: any;
  public getphontoType = [
    {label: '本地选择', value: 'photo'},
    {label: '相机拍照', value: 'camera'},
  ];
  public persionitem = [
    {label: '我的头像', value: 'assets/images/ic_header.png'},
    {label: '用户名', value: 'moonshine'},
    {label: '姓名', value: '张三'},
    {label: '手机号', value: '18385094323'},
    {label: '性别', value: '男'},
  ];
  public updateSexMsg = '修改成功';
  public wxTicket: any;
  constructor(
    private globalSrv: GlobalService,
    private router: Router,
    private mineImgSrv: MineImageCropperService
  ) {
  }

  ngOnInit() {
    this.mineImgSrv.getTicket().subscribe(
      (value) => {
        console.log(value);
        this.wxTicket = value.entity.ticket;
        this.mineUserWxSdk();
      }
    );
  }

  public minePersionSelectImageClick(): void {

    this.simplePopup.show();
  }

  // cancel select image
  public cancelSelectionClick(): void {
    console.log(123);
    this.simplePopup._onCancel();
  }

  // getphotoType
  public getphontoTypeClick(e): void {
    console.log(e);
    const that = this;
    // this.onToastShow('success');
    if (e === 'camera') {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
        sourceType: ['camera'], // 指定来源是相机.
        success: function (res: any) {
          const loaclpath = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.getLocalImgData({
            localId: loaclpath[0], // 图片的localID
            success: function (event) {
              const fileData = new FormData();
              const a_blob = noHeaderBase64DataToBlob(event.localData);
              blobToDataURL(a_blob, (blob_res) => {
              fileData.append('file', dataURLtoFile(blob_res, 'img'));
                // that.show(fileData);
                // that.simplePopup._onCancel();
                that.simplePopup._onCancel();
                that.fullPopup.show();
                that.imageChangedEvent = fileData.getAll('file');

                // alert(fileData.getAll('file'));
              });

            },
            fail: function (event) {
              console.log(event);
              that.simplePopup._onCancel();
              that.fullPopup.show();
            }
          });
        }
      });
    } else if (e === 'photo') {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
        sourceType: ['album'], // 指定来源是相册，
        success: function (res) {
          const loaclpath = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.getLocalImgData({
            localId: loaclpath[0], // 图片的localID
            success: function (event) {
              const fileData = new FormData();
              const a_blob = noHeaderBase64DataToBlob(event.localData);
              blobToDataURL(a_blob, (blob_res) => {
                fileData.append('file', dataURLtoFile(blob_res, 'img'));
                // that.show(fileData);
                // that.simplePopup._onCancel();
                // alert(fileData.getAll('file'));
                // that.show(fileData.getAll('file'));
                that.simplePopup._onCancel();
                that.fullPopup.show();
                that.imageChangedEvent = fileData.getAll('file');
              });
            },
            fail: function (event) {
              console.log(event);
              that.simplePopup._onCancel();
              that.fullPopup.show();
            }
          });
        }
      });
    }
  }

  // 弹窗
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  public show (file): void {
    this.simplePopup.close();
    this.fullPopup.show();
    this.imageChangedEvent = file;
  }
  // change info
  public minePersionChangeInfoClick(e): void {
    console.log(e);
    if (e.label === '手机号') {
      this.router.navigate(['mine/changephone'], {queryParams: {value: e.value}});
    } else if (e.label === '用户名') {
      this.router.navigate(['mine/changeusername'], {queryParams: {value: e.value}});
    }
  }

  // verify wxSDK
  public mineUserWxSdk(): void {
    let url = '';
    if (is_ios()) {
      url = this.globalSrv.wxSessionGetObject('ios_url');
    } else {
      url = window.location.href;
    }
    if (this.wxTicket) {
      const jsapi_ticket = this.wxTicket;
      const noncestr = random_word(32);
      const timestamp = (Math.round(new Date().getTime() / 1000)).toString();
      const sdkstring = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
      const signature = hex_sha1(sdkstring);
      wx.config({
        debug: false,
        appId: 'wxccc7e28f7cb8170c',
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [
          'scanQRCode',
          'chooseImage',
          'openLocation',
          'getLocation',
          'previewImage',
        ]
      });
      alert('认证成功');
      return;
    }
    window.alert('微信JS-SDK认证失败,请重试');
  }
  // fileChangeEvent(event: any): void {
  //   // this.imageChangedEvent = event;
  //   // console.log(event.srcElement.files[0]);
  //   // this.globalSrv.wxSessionSetObject('file', event.srcElement.files[0]);
  //   this.fullPopup.show();
  //   this.imageChangedEvent = event.srcElement.files[0];
  // }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
    this.imgfile =  this.data64toFile(this.croppedImage, 'img');
    console.log(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  private  data64toFile(dataurl, filename) {
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
   public  blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
}


