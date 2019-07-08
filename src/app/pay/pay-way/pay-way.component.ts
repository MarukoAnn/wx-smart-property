import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {PayWayService} from '../../common/services/pay-way.service';
import {GlobalService} from '../../common/services/global.service';
import {PayData, PayMoneyData} from '../../common/model/pay-payway.model';
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
    {label: '缴费月数', value: '', symbol: 0},
    {label: '优惠卷', value: '', symbol: 0},
    {label: '余额抵扣', value: '', symbol: 1},
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
        if (this.couponCode === false || this.couponCode === 'null') {
          this.payWaySrv.getPayInfo({chargeCode: val.chargeCode, roomCode: this.roomCode, datedif: val.month}).subscribe(
            (value) => {
              // console.log(value);
              this.payMoneyData.couponId = -1;
            this.payDetailDta[0].value = value.entity.roomCode;
            this.payDetailDta[1].value = value.entity.datedif;
            if (value.entity.couponMoney === 'null') {
              this.payDetailDta[2].value = '选择优惠卷';
            }
            this.payDetailDta[3].value = value.entity.money;
            this.payDetailDta[4].value = value.entity.oldMoney;
            this.payDetailDta[5].value = value.entity.newMoney;
            }
          );
        } else {
          this.payWaySrv.getPayInfo({chargeCode: val.chargeCode, roomCode: this.roomCode, datedif: val.month, couponId: this.couponCode}).subscribe(
            (value) => {
              console.log(value);
              this.payMoneyData.couponId =    this.couponCode;

              this.payDetailDta[0].value = value.entity.roomCode;
              this.payDetailDta[1].value = value.entity.datedif;
              this.payDetailDta[2].value = value.entity.couponMoney;
              this.payDetailDta[2].symbol = 1;
              this.payDetailDta[3].value = value.entity.money;
              this.payDetailDta[4].value = value.entity.oldMoney;
              this.payDetailDta[5].value = value.entity.newMoney;
            }
          );
        }
      }
    );
  }
  public  payMoneyClick(): void {
      this.payMoneyData.openId = this.globalSrv.wxSessionGetObject('openid');
      this.payWaySrv.getPayMoney(this.payMoneyData).subscribe(
        value => {
          console.log(value);
           this.payData.appId = value.entity.appId;
           this.payData.nonceStr = value.entity.nonceStr;
           this.payData.package = value.entity.packagedto;
           this.payData.paySign = value.entity.paySign;
           this.payData.signType = value.entity.signType;
           this.payData.timeStamp = value.entity.timeStamp;
          // if (value.code === '2000'){
            this.onBridgeReady(this.payData);
          // }
        }
      );
  }
  // weixin pay
  public onBridgeReady(obj) {
    console.log(obj);
    const that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        'appId': obj.appId,
        'timeStamp': obj.timeStamp,
        'nonceStr': obj.nonceStr,
        'package': obj.package,
        'signType': obj.signType,
        'paySign': obj.paySign,
      },
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
          // );
        } else {
          // alert(res.err_msg);
          alert(obj.package);
        }
      });
  }
  public  paySelectCouponClick(value): void {
      if (value === '优惠卷') {
        this.router.navigate(['chargepay/coupon'], {queryParams: {chargeCode: this.chargeCode, roomCode: this.roomCode}});
      }
  }

  ngOnDestroy(): void {
    this.globalSrv.wxSessionRemove('couponCode');
  }

}
