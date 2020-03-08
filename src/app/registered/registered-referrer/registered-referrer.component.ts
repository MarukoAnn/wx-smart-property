import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {

  ActionSheetService,
  SkinType, ToastComponent,
  ToastService,
  ToptipsComponent, ToptipsService
} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {HeaderContent} from '../../common/components/header/header.model';
import {RegisteredReferrerModel} from '../../common/model/registered-referrer.model';
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
  public loading_show = false;
  public showData = '获取验证码';
  public verifyPhone: RegExp = /^1[37458]\d{9}$/;
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
  public hiddenWarn = false;
  constructor(
    private actionSheetService: ActionSheetService,
    private toastService: ToastService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private registeredSrv: RegisteredService,
    private globalSrv: GlobalService,
    private toptipSrv: ToptipsService,
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
      const List = ['surName', 'phone'];
      const status = List.some(v => {
        return this.referrerData[v] === undefined || this.referrerData[v] === '';
      });
      if (status) {
        this.onShow('warn', '您有数据未填写');
      } else {
        this.flag = 2;
        this.setToast('loading');
        this.registeredSrv.bindingData({data: this.referrerData, openId: this.globalSrv.wxSessionGetObject('openid')}).subscribe(
          (value) => {
            this.toastService.hide();
            this.flag = 1;
            if (value.code === '1000') {
              this.globalSrv.wxSessionSetObject('appkey', value.entity.APPKEY);
              // this.loading_show = false;
              this.router.navigate(['/tab/home']);
            } else {
              this.onShow('warn', value.msg);
            }

          }
        );
      }
    } else {
      this.onShow('warn', '正在提交信息，请勿重复点击');
    }
  }
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  setToast(type: 'success' | 'loading') {
    this.toastService[type]();
  }
  // 身份证验证
  public  inputNumberFocus(): void {
      if (this.verifyPhone.test(this.referrerData.phone)) {
        this.hiddenWarn = false;
      } else {
        this.hiddenWarn = true;
      }
  }

  public  getPhoneCode(): void {
    if (this.referrerData.phone !== undefined || this.referrerData.surName !== undefined) {
      // this.setToast('loading', true);
        this.registeredSrv.getPhoneNumber({userName: this.referrerData.surName, mobilePhone: this.referrerData.phone }).subscribe(
          value => {
            if (value.code === '1000') {
              this.calc();
            } else {
              this.onShow('warn', value.msg);
              setTimeout(() => {
                this.showData = '重新发送';
              }, 1000);
            }
          }
        );

      }
  }
 public  calc(): void {
   let i = 60;
   const showSecond = setInterval(() => {
     if (i < 1) {
       clearInterval(showSecond);
       this.showData = '获取验证码';
     } else {
       this.showData = i + 's';
     }
     i--;
   }, 1000);
 }
}
