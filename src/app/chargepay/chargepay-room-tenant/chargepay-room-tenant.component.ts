import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ChargepayRoomTenantService} from '../../common/services/chargepay-room-tenant.service';
import {GlobalService} from '../../common/services/global.service';
import {ActivatedRoute} from '@angular/router';
import {PTRComponent} from 'ngx-weui';
import {timer} from 'rxjs';

@Component({
  selector: 'app-chargepay-room-tenant',
  templateUrl: './chargepay-room-tenant.component.html',
  styleUrls: ['./chargepay-room-tenant.component.less']
})
export class ChargepayRoomTenantComponent implements OnInit {
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
  // public basicData: any[] = [];
  public tenantListData = {
    type: 1,
    data: []
  };
  constructor(
    private chargeRoomTenantSrv: ChargepayRoomTenantService,
    private globalSrv: GlobalService,
    // private globalSrv: GlobalService,

  ) { }

  ngOnInit() {
    this.chargeRoomTenantSrv.getRoomTenantList({identity: 3, roomCode:  this.globalSrv.wxGet('roomCode')}).subscribe(
      (value) => {
        console.log(value);
        value.entity.forEach( v => {
          console.log( v.userName);
          this.tenantListData.data.push({name: v.userName, phone: v.userPhone, startTime: v.startDate, endTime: v.endDate});
        });
      }
    );
  }
  // 下拉刷新
}
