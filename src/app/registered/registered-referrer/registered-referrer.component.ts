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
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
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
  public showData = '获取验证码';
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
  public flag = 1;
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
    if (this.flag === 1) {

      if (this.referrerData.password === undefined && this.referrerData.mobilePhone === undefined  || isNaN(this.referrerData.mobilePhone) || this.referrerData.password === undefined ) {
        this.onShow('warn', '您输入的数据不合法');
      } else {
        this.flag = 2;
        this.loading_show = true;
        this.registeredSrv.bindingData({data: this.referrerData, openId: this.globalSrv.wxSessionGetObject('openid')}).subscribe(
          (value) => {
            this.flag = 1;
            if (value.code === '1000') {
              this.globalSrv.wxSessionSetObject('appkey', value.entity.APPKEY);
              this.loading_show = false;
              this.router.navigate(['/tab/home']);
            }else {
              this.loading_show = false;
              this.onShow('warn', value.msg)
            }

          }
        );
      }
    } else {
      this.onShow('warn', '正在提交信息，请勿重复点击')
    }
  }
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }

  public  getPhoneCode(): void {
    if (this.referrerData.mobilePhone){
        this.registeredSrv.getPhoneNumber({phone: this.referrerData.mobilePhone}).subscribe(
          value => {
            console.log(value);
            if (value.code === '1000') {
              this.calc();
            }else {
              setTimeout(()=> {
                this.showData = '重新发送';
              },1000);
            }
          }
        )

      }
    return
  }
 public  calc(): void {
   let i = 60;
   const showSecond = setInterval(()=> {
     if (i < 1) {
       clearInterval(showSecond);
       this.showData = '获取验证码'
     }else {
       this.showData = i + 's';
       console.log(this.showData);
     }
     i--
   }, 500);
 }
}
