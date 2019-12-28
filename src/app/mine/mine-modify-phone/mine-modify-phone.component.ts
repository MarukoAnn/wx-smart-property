import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mine-modify-phone',
  templateUrl: './mine-modify-phone.component.html',
  styleUrls: ['./mine-modify-phone.component.less']
})
export class MineModifyPhoneComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '修改手机号',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public iphone: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  public  onSendCode(): void {
    console.log(123);
  }
  public  backHome(): void {
    window.history.back();
  }
}
