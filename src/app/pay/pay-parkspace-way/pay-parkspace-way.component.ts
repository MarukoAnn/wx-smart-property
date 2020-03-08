import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PayData, PayMoneyData} from '../../common/model/pay-payway.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PayWayService} from '../../common/services/pay-way.service';
import {GlobalService} from '../../common/services/global.service';
import {ToastService} from 'ngx-weui';
declare let WeixinJSBridge;
@Component({
  selector: 'app-pay-parkspace-way',
  templateUrl: './pay-parkspace-way.component.html',
  styleUrls: ['./pay-parkspace-way.component.less']
})
export class PayParkspaceWayComponent implements OnInit {
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
  public payDetailDta = [];
  public payParkDetail =[
    {label: '房间编号', value: '', symbol: 0},
    {label: '车牌号', value: '', symbol: 0},
    {label: '缴费项目', value: '月卡车位服务费', symbol: 0},
    {label: '开始日期', value: '', symbol: 0},
    {label: '截止日期', value: '', symbol: 0},
    {label: '缴费月数', value: '', symbol: 0},
    {label: '应缴金额', value: '', symbol: 1},
    {label: '实缴金额', value: '', symbol: 1},
  ];
  public payPreParkDetail=[
    {label: '车位编号', value: '', symbol: 0},
    {label: '车牌号', value: '', symbol: 0},
    {label: '缴费项目', value: '转有车服务费', symbol: 0},
    {label: '开始日期', value: '', symbol: 0},
    {label: '截止日期', value: '', symbol: 0},
    {label: '缴费月数', value: '', symbol: 0},
    {label: '应缴金额', value: '', symbol: 1},
    {label: '实缴金额', value: '', symbol: 1},
  ];
  public couponCode: any;
  public roomCode: any;
  public chargeCode: any;
  public payMoneyData = {
    roomCode: '',
    parkingSpaceCostDetailDO:{
    roomCode: '',
    licensePlateNumber: '',
    datedif: '',
    rentalRenewalStatus: '1'
  },
  organizationId: '',
  openId: '',
};
  // 获取转有车位信息
  public preParkInfo = {
    organizationId:'',
    datedif: '',
    parkingSpaceCode: ''
  };
  public status: any;
  public payData: PayData = new  PayData();
  constructor(
    private router: Router,
    private getRouter: ActivatedRoute,
    private payWaySrv: PayWayService,
    private globalSrv: GlobalService,
    private toastSrv: ToastService,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe(
      (val) => {
        this.status = val.status;
        if (val.status === '2'){
          this.payDetailDta = this.payParkDetail;
          this.payDetailDta[0].value = val.roomCode;
          this.payDetailDta[1].value = val.licensePlateNumber;
          this.payDetailDta[3].value = val.startTime;
          this.payDetailDta[4].value = val.dueTime;
          this.payDetailDta[5].value = val.datedif;
          this.payDetailDta[6].value = val.amountReceivable;
          this.payDetailDta[7].value = val.actualMoneyCollection;
          this.payMoneyData.parkingSpaceCostDetailDO.datedif = val.datedif;
          this.payMoneyData.parkingSpaceCostDetailDO.roomCode = val.roomCode;
          this.payMoneyData.parkingSpaceCostDetailDO.licensePlateNumber = val.licensePlateNumber;
          this.payMoneyData.roomCode = val.roomCode;
        }else  {
            this.preParkInfo.datedif = val.datedif;
            this.preParkInfo.parkingSpaceCode = this.globalSrv.wxGet('parkingSpaceCode');
            this.preParkInfo.organizationId = this.globalSrv.wxGet('organizationId');
            this.getpreParkData();
        }
      }
    );
  }
  public  getpreParkData(): void {
      this.payWaySrv.getPrePayParkInfo(this.preParkInfo).subscribe(
        value => {
          if (value.code === '1000') {
            this.payDetailDta = this.payPreParkDetail;
            this.payDetailDta[0].value = value.entity.data.parkingSpaceCode;
            this.payDetailDta[1].value = value.entity.data.licensePlateNumber;
            this.payDetailDta[3].value = value.entity.data.startTime;
            this.payDetailDta[4].value = value.entity.data.dueTime;
            this.payDetailDta[5].value = value.entity.data.datedif;
            this.payDetailDta[6].value = value.entity.data.amountReceivable;
            this.payDetailDta[7].value = value.entity.data.actualMoneyCollection;
          }
        }
      )
  }
  public  payMoneyClick(): void {
    this.payMoneyData.organizationId = this.globalSrv.wxGet('organizationId');
    this.payMoneyData.openId = this.globalSrv.wxSessionGetObject('openid');
    if (this.status === '2'){
      this.onShowBySrv('loading', false);
      this.payWaySrv.getPayParkMoney(this.payMoneyData).subscribe(
        value => {
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
    }else {
      // this.payMoneyData.organizationId = this.globalSrv.wxGet('organizationId');
      // this.payMoneyData.openId = this.globalSrv.wxSessionGetObject('openid');
      // this.payMoneyData.openId = 'o_Jhq1AqGCADdhWrZLMcrX5NYMnE';
      this.onShowBySrv('loading', false);
      this.payWaySrv.payPreParkMoney(this.preParkInfo).subscribe(
        value => {
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
