import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';

@Component({
  selector: 'app-pay-way',
  templateUrl: './pay-way.component.html',
  styleUrls: ['./pay-way.component.less']
})
export class PayWayComponent implements OnInit {
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
    {label: '房间编号', value: 'YCSP-A3-4-3406', symbol: 0},
    {label: '缴费月数', value: '1个月', symbol: 0},
    {label: '物业费剩余金额', value: '0.5', symbol: 1},
    {label: '应交金额', value: '12.5', symbol: 1},
    {label: '实缴金额', value: '12', symbol: 1},
  ];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  public  payMoneyClick(): void {
      console.log('支付成功');
      this.router.navigate(['pay/success']);
  }

}
