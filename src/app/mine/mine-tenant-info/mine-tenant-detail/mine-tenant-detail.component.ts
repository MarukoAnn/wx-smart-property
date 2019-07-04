import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';
import {MineTenantService} from '../../../common/services/mine-tenant.service';
import {ToptipsService} from 'ngx-weui';

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
    {label: '姓名' , value: ''},
    {label: '性别' , value: ''},
    {label: '手机号' , value: ''},
  ];
  constructor(
    private getRouter: ActivatedRoute,
    private mineTenantSrv: MineTenantService,
    private toptipSrv: ToptipsService,

  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      // console.log(value.data);
      this.mineTenantInfoInit(value.value);
    });
  }
  public mineTenantInfoInit (id): void {
    this.mineTenantSrv.queryMineDeputyInfoById({userId: id}).subscribe(
      value => {
        console.log(value);
        this.tenantDetailData[0].value = value.entity.userName;
        this.tenantDetailData[1].value = value.entity.sex;
        this.tenantDetailData[2].value = value.entity.userPhone;
        this.onShow('success', '查询成功');
      }
    );
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
