import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PopupComponent, ToastComponent} from 'ngx-weui';
import {GlobalService} from '../../common/services/global.service';
import {Router} from '@angular/router';
declare const wx: any;
@Component({
  selector: 'app-mine-personal-info',
  templateUrl: './mine-personal-info.component.html',
  styleUrls: ['./mine-personal-info.component.less']
})
export class MinePersonalInfoComponent implements OnInit {
  @ViewChild('photo') simplePopup: PopupComponent;
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
  public getphontoType = [
    {label: '本地选择' , value: 'photo'},
    {label: '相机拍照' , value: 'camera'},
  ];
  public persionitem = [
    {label: '我的头像', value: 'assets/images/ic_header.png'},
    {label: '用户名', value: 'moonshine'},
    {label: '姓名', value: '张三'},
    {label: '手机号', value: '18385094323'},
    {label: '性别', value: '男'},
  ];
  public updateSexMsg = '修改成功';
  constructor(
    private globalSrv: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mineUserWxSdk();
  }
  public  minePersionSelectImageClick(): void {
      this.simplePopup.show();
  }

  // cancel select image
  public cancelSelectionClick (): void {
    console.log(123);
      this.simplePopup._onCancel();
  }
  // getphotoType
  public  getphontoTypeClick(e): void {
      console.log(e);
      this.onToastShow('success');
      if (e === 'camera') {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
          sourceType: ['camera'], // 指定来源是相机.
          success: function (res) {
            const loaclpath = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.getLocalImgData({
              localId: loaclpath[0], // 图片的localID
              success: function () {
                const fileData = new FormData();
                fileData.append('file', loaclpath);
                alert(fileData.getAll('file'));
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
              success: function () {
                const fileData = new FormData();
                fileData.append('file', loaclpath);
                alert(fileData.getAll('file'));
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
  // change info
  public  minePersionChangeInfoClick(e): void {
      console.log(e);
      if (e.label === '手机号') {
        this.router.navigate(['mine/changephone'], {queryParams: {value: e.value}});
      } else if (e.label === '用户名') {
        this.router.navigate(['mine/changeusername'], {queryParams: {value: e.value}});
      }
  }
  // verify wxSDK
  public mineUserWxSdk(): void {
    // let url = '';
    // if (is_ios()) {
    //   url = this.globalSrv.wxSessionGetObject('ios_url');
    // } else {
    //   url = window.location.href;
    // }
    // if (this.globalSrv.wxSessionGetObject('ticket')) {
    //   const jsapi_ticket = this.globalSrv.wxSessionGetObject('ticket');
    //   const noncestr = random_word(32);
    //   const timestamp = (Math.round(new Date().getTime() / 1000)).toString();
    //   const sdkstring = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    //   const signature = hex_sha1(sdkstring);
    //   wx.config({
    //     debug: false,
    //     appId: 'wxbacad0ba65a80a3d',
    //     timestamp: timestamp,
    //     nonceStr: noncestr,
    //     signature: signature,
    //     jsApiList: [
    //       'scanQRCode',
    //       'chooseImage',
    //       'openLocation',
    //       'getLocation',
    //     ]
    //   });
    //   return;
    // }
    // window.alert('微信JS-SDK认证失败,请重试');
  }
}
