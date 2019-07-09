import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ActionSheetComponent,
  ActionSheetConfig,
  ActionSheetService,
  DialogComponent,
  DialogConfig,
  SkinType,
  ToastService,
  ToptipsComponent, ToptipsService
} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {isNumber} from '../../common/tools/is_number';
import {random_word} from '../../common/tools/random_word';
import {is_ios} from '../../common/tools/is_ios';
import {
  blobToDataURL,
  noHeaderBase64DataToBlob,
} from '../../common/tools/readBlobAsDataURL';
import {HeaderContent} from '../../common/components/header/header.model';
import {RegisteredReferrerModel} from '../../common/model/registered-referrer.model';
declare const qrcode: any;
declare const wx: any;
@Component({
  selector: 'app-registered-referrer',
  templateUrl: './registered-referrer.component.html',
  styleUrls: ['./registered-referrer.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredReferrerComponent implements OnInit, OnDestroy {
  // ActionSheet
  @ViewChild('toptips') toptips: ToptipsComponent;
  @ViewChild('user') userInput: any;
  public surePsw: any;
  public verificationCode: any;
  public loading_show = false;
  public headerOption: HeaderContent = {
    title: '用户绑定',
    leftContent: {
      // icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public referrerData: RegisteredReferrerModel = new RegisteredReferrerModel();
  constructor(
    private actionSheetService: ActionSheetService,
    private toastService: ToastService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private registeredSrv: RegisteredService,
    private globalSrv: GlobalService,
    private toptipSrv: ToptipsService
  ) { }

  ngOnInit() {
    // if (this.globalSrv.wxSessionGetObject('openid')) {
    //   this.referrerNumber.openid = this.globalSrv.wxSessionGetObject('openid');
    //   // this.referrerVerifyWxSdk();
    // }
  }
  ngOnDestroy() {
    this.actionSheetService.destroyAll();
  }
  // workId click
  public bindingClick(): void {
    // console.log(t);
    console.log(this.referrerData.password);
    if (this.referrerData.password === undefined && this.referrerData.mobilePhone === undefined  || isNaN(this.referrerData.mobilePhone) || this.referrerData.password === undefined ) {
      this.onShow('warn', '您输入的数据不合法');
    } else {
      this.loading_show = true;
      this.registeredSrv.bindingData({data: this.referrerData, openId: this.globalSrv.wxSessionGetObject('openid')}).subscribe(
        (value) => {
          this.globalSrv.wxSessionSetObject('appkey', value.entity.APPKEY);
          this.loading_show = false;
          this.router.navigate(['/tab/home']);
        }
      );
    }

  }
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  public  onSendCode(): void {
      console.log(123);
  }
}
