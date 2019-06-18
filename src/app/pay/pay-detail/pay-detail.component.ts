import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pay-detail',
  templateUrl: './pay-detail.component.html',
  styleUrls: ['./pay-detail.component.less']
})
export class PayDetailComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '缴费明细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public basicData = [
    {label: '房屋编号', value: 'A3-15栋2406'},
    {label: '项目名', value: '未来城一期'},
    {label: '地块', value: 'A区'},
    {label: '单元', value: 'A3单元'},
    {label: '面积', value: '234平米'},
    {label: '花园面积', value: '无'},
    {label: '业主', value: '张三'},
    {label: '电话', value: '18284823242'},
  ];
  public paydetail = [
    {data: [{label: '缴费时间', value: '2019-05-14'}, {label: '缴费类型', value: '物业费'}, {label: '缴费人', value: '张先生'}], payValue: '34.5'},
    {data: [{label: '缴费时间', value: '2019-05-14'}, {label: '缴费类型', value: '物业费'}, {label: '缴费人', value: '王先生'}], payValue: '24.5'},
    {data: [{label: '缴费时间', value: '2019-05-14'}, {label: '缴费类型', value: '物业费'}, {label: '缴费人', value: '李先生'}], payValue: '53.5'},
  ];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public  paydetailUserClick(e): void {
      console.log(e[2].value);
      this.router.navigate(['/chargepay/userinfo'], {queryParams: {item: e[2].value}});
  }
}
