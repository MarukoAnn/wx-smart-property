import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';
import {PTRComponent} from 'ngx-weui';
import {timer} from 'rxjs';

@Component({
  selector: 'app-mine-tenant-info',
  templateUrl: './mine-tenant-info.component.html',
  styleUrls: ['./mine-tenant-info.component.less']
})
export class MineTenantInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '租客信息',
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
  public  mineTenantDeleteClick(item): void {
    // console.log(item);
    this.deputyInfo.splice(item, 1);
  }
  // modify deputyInfo
  public  mineTenantModifyClick(e): void {
    this.router.navigate(['mine/tenantmodify'], {queryParams: {value: e.data[0].value}});
  }
  // Detail deputyInfo
  public  mineTenantDetailClick(e): void {
    // console.log(e);
    this.router.navigate(['mine/tenantDetail'], { queryParams: {value: e.data[0].value}});
  }
  // add deputyInfo
  public  mineTenantAddClick(): void {
    // console.log();
    this.router.navigate(['mine/tenantadd']);
  }
}
