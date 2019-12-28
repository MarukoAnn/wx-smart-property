import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PopupComponent, ToastComponent} from 'ngx-weui';
import {GlobalService} from '../../common/services/global.service';
import {Router} from '@angular/router';
import {is_ios} from '../../common/tools/is_ios';
import {random_word} from '../../common/tools/random_word';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {MinePersionalInfoService} from '../../common/services/mine-persional-info.service';
import {environment} from '../../../environments/environment';

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
  // public imageChangedEvent: any = '';
  // public getphontoType = [
  //   {label: '本地选择', value: 'photo'},
  //   {label: '相机拍照', value: 'camera'},
  // ];
  public persionitem = [
    {label: '我的头像', value: ''},
    {label: '用户名', value: ''},
    // {label: '姓名', value: '张三'},
    {label: '手机号', value: ''},
    {label: '性别', value: ''},
  ];
  // public updateSexMsg = '修改成功';
  public wxTicket: any;
  constructor(
    private globalSrv: GlobalService,
    private router: Router,
    private minePerSrv: MinePersionalInfoService
  ) {
  }
  ngOnInit() {
    if (this.globalSrv.wxSessionGetObject('imageUrl') !== undefined){
      this.persionitem[0].value = this.globalSrv.wxSessionGetObject('imageUrl');
    }
    this.initializationUser();
    // this.minePerSrv.getTicket().subscribe(
    //   (value) => {
    //     this.wxTicket = value.entity.ticket;
    //     // this.mineUserWxSdk();
    //   }
    // );
  }
  // initialization user
  public initializationUser (): void {
      this.minePerSrv.mineGetUserInfo().subscribe(
        (value) => {
          this.persionitem[1].value = value.entity.userName;
          this.persionitem[2].value = value.entity.mobilePhone;
          this.persionitem[3].value = value.entity.sex;
        }
      );
  }
  // pop show
  // public minePersionSelectImageClick(): void {
  //   this.simplePopup.show();
  // }

  // cancel select image
  // public cancelSelectionClick(): void {
  //   this.simplePopup.close();
  //
  // }


  // getphotoType
  // public getphontoTypeClick(e): void {
  //   console.log(e);
  //   const that = this;
  //   // this.onToastShow('success');
  //   if (e === 'camera') {
  //     wx.chooseImage({
  //       count: 1, // 默认9
  //       sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
  //       sourceType: ['camera'], // 指定来源是相机.
  //       success: function (res: any) {
  //         if (res.localIds) {
  //           const loaclpath = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  //           wx.getLocalImgData({
  //             localId: loaclpath[0], // 图片的localID
  //             success: function (event) {
  //               that.globalSrv.wxSessionSetObject('id', event.localData );
  //               window.location.href = environment.dev_test_url + '/CloudPropertyView/mine/imagecropper';
  //             }
  //           });
  //         }
  //       },
  //     });
  //   } else if (e === 'photo') {
  //     that.simplePopup.close();
  //     wx.chooseImage({
  //       count: 1, // 默认9
  //       sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
  //       sourceType: ['album'], // 指定来源是相册，
  //       success: function (res) {
  //         if (res.localIds) {
  //           const loaclpath = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  //           wx.getLocalImgData({
  //             localId: loaclpath[0], // 图片的localID
  //             success: function (event) {
  //               that.globalSrv.wxSessionSetObject('id', event.localData );
  //               // that.router.navigate(['/mine/imagecropper']);
  //               window.location.href = environment.dev_test_url + '/CloudPropertyView/mine/imagecropper';
  //               }
  //           });
  //           }
  //         }
  //     });
  //   }
  // }

  // // 弹窗
  // public onToastShow(type: 'success' | 'loading') {
  //   (<ToastComponent>this[`${type}Toast`]).onShow();
  // }
  // change info
  public minePersionChangeInfoClick(e): void {
    console.log(e);
   if (e.label === '用户名') {
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
      // alert('认证成功');
      return;
    }
    window.alert('微信JS-SDK认证失败,请重试');
  }

  public  backHome(): void {
    this.router.navigate(['tab/mine']);
  }
}


