import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mine-tenant-detail',
  templateUrl: './mine-tenant-detail.component.html',
  styleUrls: ['./mine-tenant-detail.component.less']
})
export class MineTenantDetailComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '详细信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public tenantDetailData = [
    {label: '姓名' , value: '张三'},
    {label: '性别' , value: '男'},
    {label: '手机号' , value: '12830123821'},
  ];
  constructor(
    private getRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      this.tenantDetailData[0].value = value.value;
      // console.log(value.data);
    });
  }
}
