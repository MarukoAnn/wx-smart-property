import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PTRComponent} from 'ngx-weui';
import {timer} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mine-deputy-owner-info',
  templateUrl: './mine-deputy-ower-info.component.html',
  styleUrls: ['./mine-deputy-ower-info.component.less']
})
export class MineDeputyOwerInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '副业为主信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public deputyInfo = [
    {data: [
      {label: '姓名', value: '张先生'},
      {label: '关联时间', value: '2029-3-3'},
      {label: '详细地址', value: 'A3-15栋2406'},
      {label: '房屋着落', value: '贵阳市云城商品小区'}
    ]},
    {data: [
        {label: '姓名', value: '王先生'},
        {label: '关联时间', value: '2029-3-3'},
        {label: '详细地址', value: 'A3-15栋2406'},
        {label: '房屋着落', value: '贵阳市云城商品小区'}
      ]},
    {data: [
        {label: '姓名', value: '李先生'},
        {label: '关联时间', value: '2029-3-3'},
        {label: '详细地址', value: 'A3-15栋2406'},
        {label: '房屋着落', value: '贵阳市云城商品小区'}
      ]},
];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  // 下拉刷新
  onRefresh(ptr: PTRComponent) {
    timer(800).subscribe(() => {
      this.deputyInfo.push(  {data: [
          {label: '姓名', value: '李先生'},
          {label: '关联时间', value: '2029-3-3'},
          {label: '详细地址', value: 'A3-15栋2406'},
          {label: '房屋着落', value: '贵阳市云城商品小区'}
        ]});
      ptr.setFinished();
    });
  }
  // delete deputyInfo
  public  mineDeputyDeleteClick(item): void {
      // console.log(item);
      this.deputyInfo.splice(item, 1);
  }
  // modify deputyInfo
  public  mineDeputyModifyClick(e): void {
      this.router.navigate(['mine/changedeputy'], {queryParams: {value: e.data[0].value}});
  }
  // Detail deputyInfo
  public  mineDeputyDetailClick(e): void {
      // console.log(e);
    this.router.navigate(['mine/deputyDetail'], { queryParams: {value: e.data[0].value}});
  }
  // add deputyInfo
  public  mineDeputyAddClick(): void {
      // console.log();
    this.router.navigate(['mine/deputyadd']);
  }
}
