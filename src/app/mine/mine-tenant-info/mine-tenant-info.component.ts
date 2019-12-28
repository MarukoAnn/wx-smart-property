import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';
import {PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';
import {MineDeputyService} from '../../common/services/mine-deputy.service';
import {MineTenantService} from '../../common/services/mine-tenant.service';
import {GlobalService} from '../../common/services/global.service';

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
  public deleteTenant = {
    identity: '',
    roomCode: '',
    userId: '',
    verificationCode: ''
  };
  public tenantInfo = [];
  public flag = 2;
  constructor(
    private router: Router,
    private mineTenantSrv: MineTenantService,
    private toptipSrv: ToptipsService,
    private globalSrv: GlobalService

  ) { }

  ngOnInit() {
    this.globalSrv.wxSessionRemove('roomList');
    this.mineTenantInfoInit(1);
  }
  public mineTenantInfoInit(page): void {
    this.mineTenantSrv.queryMineTenantInfoList({pageNum: page, pageSize: 10, identity: 3}).subscribe(
      value => {
        this.tenantInfo = [];
        value.entity.forEach( v => {
          if (v !== null) {
            this.tenantInfo.push( {data: [
                {label: '姓名', value: v.userName},
                {label: '关联时间', value: v.data},
                {label: '详细地址', value: v.roomCode},
                {label: '房屋着落', value: v.address}
              ], userId: v.userId});
          }
        });
        // this.onShow('success', '查询' + value.msg);
      }
    );
  }
  // 下拉刷新
  onRefresh(ptr: PTRComponent) {
    timer(800).subscribe(() => {
      this.mineTenantInfoInit(1);
      this.flag ++;
      ptr.setFinished();
    });
  }
  // delete deputyInfo
  public  mineTenantDeleteClick(item): void {
    console.log(item);
    this.deleteTenant.identity = '3';
    this.deleteTenant.roomCode = item.data[2].value;
    this.deleteTenant.userId = item.userId;
    this.globalSrv.wxSessionSetObject('addData', this.deleteTenant);
    this.router.navigate(['/mine/mineCode'], {queryParams: { type: 'delete',  value: '3'}});
    // this.mineTenantSrv.deleteMineTenantBindRoomCode({identity: 3, roomCode: item.data[2].value, userId: item.userId}).subscribe(
    //   value => {
    //     console.log(value);
    //     this.onShow('success', '删除' + value.msg);
    //     this.mineTenantInfoInit(1);
    //   }
    // );
  }
  // modify deputyInfo
  public  mineTenantModifyClick(e): void {
    this.router.navigate(['mine/tenantmodify'], {queryParams: {value: e.userId}});
  }
  // Detail deputyInfo
  public  mineTenantDetailClick(e): void {
    // console.log(e);
    this.router.navigate(['mine/tenantDetail'], { queryParams: {value: e.userId}});
  }
  // add deputyInfo
  public  mineTenantAddClick(): void {
    // console.log();
    this.router.navigate(['mine/tenantadd']);
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }

  public  backHome(): void {
    this.router.navigate(['/tab/mine']);
  }
}
