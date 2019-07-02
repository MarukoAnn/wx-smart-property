import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {GlobalService} from '../../common/services/global.service';

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
  public code: any;
  constructor(
    private globalSrv: GlobalService,
  ) { }
  public couponList = [
    {label: '抵扣卷', content: '50元物业费抵扣卷', endTime: '有效期至2019-07-23', company: '云城尚品物业', color: '#B7B7B7', code: 'YCSP-1'},
    {label: '抵扣卷', content: '50元物业费抵扣卷', endTime: '有效期至2019-07-23', company: '云城尚品物业', color: '#B7B7B7', code: 'YCSP-2'},
    {label: '抵扣卷', content: '50元物业费抵扣卷', endTime: '有效期至2019-07-23', company: '云城尚品物业', color: '#B7B7B7', code: 'YCSP-3'},
    {label: '优惠卷', content: '9.6折物业费优惠卷', endTime: '有效期至2019-07-23', company: '云城尚品物业', color: '#B7B7B7', code: 'YCSP-4'},
    {label: '抵扣卷', content: '150元物业费抵扣卷', endTime: '有效期至2019-07-23', company: '云城尚品物业', color: '#B7B7B7', code: 'YCSP-5'},
  ];
  ngOnInit() {
  }

  public  noUserCouponClick(): void {
    this.couponList.forEach(v => {
      v.color = '#B7B7B7';
      this.code = null;
    });
      if ( this.color === '#08EA5F') {
        this.color = '#B7B7B7';
      } else {
         this.color = '#08EA5F';
      }
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
      this.globalSrv.wxSessionSetObject('couponCode', this.code);
    // }
  }
}
