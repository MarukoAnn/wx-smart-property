import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-mine-chage-password',
  templateUrl: './mine-change-password.component.html',
  styleUrls: ['./mine-change-password.component.less']
})
export class MineChangePasswordComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '重置密码',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public pswData = {
    oldpsw: '',
    newpsw: '',
    surepsw: '',
  };
  constructor() { }

  ngOnInit() {
  }

}
