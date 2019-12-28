import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {GlobalService} from '../../common/services/global.service';
import {ActivatedRoute} from '@angular/router';
import {ChargepayCouponService} from '../../common/services/chargepay-coupon.service';

@Component({
  selector: 'app-chargepay-coupon',
  templateUrl: './chargepay-coupon.component.html',
  styleUrls: ['./chargepay-coupon.component.less']
})
export class ChargepayCouponComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '选择优惠券',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public color = '#B7B7B7';
  public code = null;
  constructor(
    private globalSrv: GlobalService,
    private getRouter: ActivatedRoute,
    private chargeCouponSrv: ChargepayCouponService,
  ) { }
  public couponList = [];
  ngOnInit() {
    this.getRouter.queryParams.subscribe(
      (val) => {
         this.chargeCouponSrv.getChargeCoupon({roomCode: val.roomCode, chargeCode: val.chargeCode}).subscribe(
           (value) => {
             console.log(value);
             value.entity.forEach( v => {
               this.couponList.push({label: v.couponName, content: v.money, endTime: '有效期至' + v.endDate , company: v.organizationName, Amoney: v.balanceAmount, color: '#B7B7B7', code: v.id});
             });
           }
         );
      });
  }

  public  noUserCouponClick(): void {
    this.couponList.forEach(v => {
      v.color = '#B7B7B7';
    });
    if (this.color === '#08EA5F') {
      this.color = '#B7B7B7';
    } else {
       this.color = '#08EA5F';
    }
    this.globalSrv.wxSet('couponCode', '1');
  }
  public UserCouponClick (index): void {
    console.log(index);
    this.color = '#B7B7B7';
    this.couponList.forEach(v => {
      v.color = '#B7B7B7';
    });
    this.code = this.couponList[index].code;
    this.couponList[index].color = '#08EA5F';
  }
  public leftBackClick(): void {
    // if (this.code === undefined){
    //
    // } else {
      window.history.back();
      this.globalSrv.wxSet('couponCode', this.code);
    // }
  }
}
