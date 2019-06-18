import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chargepay-user-info',
  templateUrl: './chargepay-user-info.component.html',
  styleUrls: ['./chargepay-user-info.component.less']
})
export class ChargepayUserInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '缴费人明细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public basicData: any;
  public userinfodetail = [
    {data: [{label: '缴费时间', value: '2019-05-14'}, {label: '缴费类型', value: '物业费'}], payValue: '34.5'},
    {data: [{label: '缴费时间', value: '2019-05-14'}, {label: '缴费类型', value: '物业费'}], payValue: '24.5'},
    {data: [{label: '缴费时间', value: '2019-05-14'}, {label: '缴费类型', value: '物业费'}], payValue: '53.5'},
  ];
  constructor(
    private getrouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getrouter.queryParams.subscribe((value) => {
      console.log(value.item);
      this.basicData = [
        {label: '缴费人', value: value.item},
        {label: '电话', value: '18284823242'},
        {label: '房屋编号', value: 'A3-15栋2406'},

      ];
    });
  }

}
