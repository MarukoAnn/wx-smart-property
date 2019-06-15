import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-chargepay-room-info',
  templateUrl: './chargepay-room-info.component.html',
  styleUrls: ['./chargepay-room-info.component.less']
})
export class ChargepayRoomInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '房屋基本信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '缴费明细',
      color: '#76B2F3',
      icon: ''
    }
  };
  public basicData = [
    {label: '项目名', value: '未来城一期'},
    {label: '地块', value: 'A区'},
    {label: '单元', value: 'A3单元'},
    {label: '面积', value: '234平米'},
    {label: '花园面积', value: '无'},
    {label: '业主', value: '张三'},
    {label: '电话', value: '18284823242'},
    {label: '物业费下次缴费时间', value: '2019.6.17'},
    {label: '停车费下次缴费时间', value: '2019.6.17'},
    {label: '二次加压费下次缴费时间', value: '2019.6.17'},
  ];
  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
  }

  public  chargepaylistClick(e): void {
    console.log(e);
  }
  public  tenantClick(): void {
      this.route.navigate(['/chargepay/tenant']);
  }
  public  deputeyClick(): void {
    this.route.navigate(['/chargepay/deputey']);

  }
}
