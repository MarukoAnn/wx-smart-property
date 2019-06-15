import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

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
  public tenantListData = {
    type: 1,
    data: [
      {name: '王五', phone: '18392738293', startTime: '2012.3.2', endTime: '2023.3.5'},
      {name: '刘曼', phone: '18392738293', startTime: '2012.3.2', endTime: '2023.3.5'},
      {name: '小王', phone: '18392738293', startTime: '2012.3.2', endTime: '2023.3.5'},
      {name: '李柳', phone: '18392738293', startTime: '2012.3.2', endTime: '2023.3.5'},
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
