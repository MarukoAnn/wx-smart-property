import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';
import {ChargepayRoomTenantService} from '../../common/services/chargepay-room-tenant.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-chargepay-owner-info',
  templateUrl: './chargepay-owner-info.component.html',
  styleUrls: ['./chargepay-owner-info.component.less']
})
export class ChargepayOwnerInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '业主信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public deputerListData = {
    type: 2,
    data: []
  };
  constructor(
    private getRouter: ActivatedRoute,
    private chargeRoomTenantSrv: ChargepayRoomTenantService,
    private globalSrv: GlobalService,


  ) { }

  ngOnInit() {
    this.chargeRoomTenantSrv.getRoomOwnerList({roomCode: this.globalSrv.wxGet('roomCode')}).subscribe(
      (value) => {
        if (value.entity) {
          value.entity.forEach( v => {
            // this.tenantListData
            if (v !== null) {
              this.deputerListData.data.push({name: v.userName, phone: v.phone, endTime: v.startDate});
            }
          });
        }
      }
    );
  }

}
