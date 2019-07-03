import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {PayWayService} from '../../common/services/pay-way.service';
import {GlobalService} from '../../common/services/global.service';
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
        console.log(this.couponCode);
        if (this.couponCode === false || this.couponCode === 'null') {
          this.payWaySrv.getPayInfo({chargeCode: val.chargeCode, roomCode: this.roomCode, datedif: val.month}).subscribe(
            (value) => {
              console.log(value);
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
      console.log('支付成功');

      this.router.navigate(['pay/success']);
  }
  // weixin pay
  public onBridgeReady(obj) {
    const that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', obj,
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // that.paySrv.payWeixinConfirm(that.orderId).subscribe(
          //   (val) => {
          //     that.router.navigate(['/pay/success'], {
          //       queryParams: {
          //         sn: that.payDetailsData.sn,
          //         orderId: that.payDetailsData.id
          //       }});
          //   }
          // );
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

  // public  payWayBackClick(): void {
  //     this.globalSrv.wxSessionRemove('couponCode');
  // }
}
