import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-chargepay-room-info',
  templateUrl: './chargepay-room-info.component.html',
  styleUrls: ['./chargepay-room-info.component.less']
})
export class ChargepayRoomInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '房屋基本信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '缴费明细',
      color: '#76B2F3',
      icon: ''
    }
  };
  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
  }

}
