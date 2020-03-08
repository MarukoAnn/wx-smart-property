import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {PayWayService} from '../../common/services/pay-way.service';
import {GlobalService} from '../../common/services/global.service';
import {PayData, PayMoneyData} from '../../common/model/pay-payway.model';
import {ToastComponent, ToastService} from 'ngx-weui';
declare let WeixinJSBridge;
@Component({
  selector: 'app-pay-way',
  templateUrl: './pay-way.component.html',
  styleUrls: ['./pay-way.component.less']
})
export class PayWayComponent implements OnInit, OnDestroy {
  public headerOption: HeaderContent = {
    title: '支 付 详 细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public payDetailDta = [
    {label: '房间编号', value: '', symbol: 0},
    {label: '开始时间', value: '', symbol: 0},
    {label: '截至时间', value: '', symbol: 0},
    {label: '缴费月数', value: '', symbol: 0},
    {label: '优惠卷', value: '', symbol: 0},
    {label: '余额抵扣', value: '', symbol: 1},
    {label: '退款金额', value: '', symbol: 1},
    {label: '三通费金额', value: '', symbol: 1},
    {label: '应交金额', value: '', symbol: 1},
    {label: '实缴金额', value: '', symbol: 1},
  ];
  public couponCode: any;
  public roomCode: any;
  public chargeCode: any;
  public payMoneyData: PayMoneyData = new PayMoneyData();
  public payData: PayData = new  PayData();
  constructor(
    private router: Router,
    private getRouter: ActivatedRoute,
    private payWaySrv: PayWayService,
    private globalSrv: GlobalService,
    private toastSrv: ToastService
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe(
      (val) => {
        // console.log(val);
        this.roomCode = this.globalSrv.wxGet('roomCode');
        this.chargeCode = val.chargeCode;
        this.couponCode = this.globalSrv.wxGet('couponCode');
        // console.log(this.couponCode);
        this.payMoneyData.chargeCode =    this.chargeCode;
        this.payMoneyData.roomCode =    this.roomCode;
        this.payMoneyData.datedif = val.month;
        if (this.couponCode === false || this.couponCode === 'null' ||  this.couponCode === '1') {
          this.payWaySrv.getPayInfo({chargeCode: val.chargeCode, roomCode: this.roomCode, datedif: val.month, organizationId: this.globalSrv.wxGet('organizationId')}).subscribe(
            (value) => {
              console.log(value);
            this.payMoneyData.couponId = -1;
            this.payDetailDta[0].value = value.entity.roomCode;
            this.payDetailDta[1].value = value.entity.startTime;
            this.payDetailDta[2].value = value.entity.endTime;
            this.payDetailDta[3].value = value.entity.datedif;
            if ( this.couponCode === '1') {
              this.payDetailDta[4].value = '不使用优惠卷';
            } else if (value.entity.couponMoney === 'null') {
                this.payDetailDta[4].value = '请选择优惠卷';
            }
            this.payDetailDta[5].value = value.entity.money;
            this.payDetailDta[6].value = value.entity.returnMoney;
            this.payDetailDta[7].value = value.entity.threeWayFee;
            this.payDetailDta[8].value = value.entity.oldMoney;
            this.payDetailDta[9].value = value.entity.newMoney;
            }
          );
        } else {
          this.payWaySrv.getPayInfo({chargeCode: val.chargeCode, roomCode: this.roomCode, datedif: val.month, couponId: this.couponCode}).subscribe(
            (value) => {
              console.log(value);
              this.payMoneyData.couponId =    this.couponCode;
              this.payDetailDta[0].value = value.entity.roomCode;
              this.payDetailDta[1].value = value.entity.startTime;
              this.payDetailDta[2].value = value.entity.endTime;
              this.payDetailDta[3].value = value.entity.datedif;
              this.payDetailDta[4].value = value.entity.couponMoney;
              this.payDetailDta[4].symbol = 1;
              this.payDetailDta[5].value = value.entity.money;
              this.payDetailDta[6].value = value.entity.returnMoney;
              this.payDetailDta[7].value = value.entity.threeWayFee;
              this.payDetailDta[8].value = value.entity.oldMoney;
              this.payDetailDta[9].value = value.entity.newMoney;
            }
          );
        }
      }
    );
  }
  public  payMoneyClick(): void {
      this.payMoneyData.openId = this.globalSrv.wxSessionGetObject('openid');
      this.onShowBySrv('loading', false);
      this.payWaySrv.getPayMoney(this.payMoneyData).subscribe(
        value => {
          console.log(value);
          this.payData.appId = value.entity.appId;
          this.payData.nonceStr = value.entity.nonceStr;
          this.payData.package = value.entity.packagedto;
          this.payData.paySign = value.entity.paySign;
          this.payData.signType = value.entity.signType;
          this.payData.timeStamp = value.entity.timeStamp;
          this.onShowBySrv('loading', true);
          this.onBridgeReady(this.payData);
        }
      );
  }
  // weixin pay
  public onBridgeReady(obj) {
    this.globalSrv.wxSessionRemove('couponCode');
    const that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', obj,
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          that.router.navigate(['pay/success']);
          // that.paySrv.payWeixinConfirm(that.orderId).subscribe(
          //   (val) => {
          //     that.router.navigate(['/pay/success'], {
          //       queryParams: {
          //         sn: that.payDetailsData.sn,
          //         orderId: that.payDetailsData.id
          //       }});
          //   }
        }
      });
  }
  public  paySelectCouponClick(value): void {
      if (value === '优惠卷') {
        this.router.navigate(['chargepay/coupon'], {queryParams: {chargeCode: this.chargeCode, roomCode: this.roomCode}});
      }
  }
  onShowBySrv(type: 'success' | 'loading', forceHide: boolean = false) {
    this.toastSrv[type]();
    if (forceHide === true) {
      setTimeout(() => {
        this.toastSrv.hide();
      }, 1000);
    }
  }
  ngOnDestroy(): void {
    // this.globalSrv.wxSessionRemove('couponCode');
  }
  public  backHome(): void {
    this.globalSrv.wxSessionRemove('couponCode');
    window.history.back();
  }
}
