import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';
import {ToptipsService} from 'ngx-weui';
import set = Reflect.set;

@Component({
  selector: 'app-mine-persion-change-phone',
  templateUrl: './mine-persion-change-phone.component.html',
  styleUrls: ['./mine-persion-change-phone.component.less']
})
export class MinePersionChangePhoneComponent implements OnInit {
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
    private getRouter: ActivatedRoute,
    private toptipSrv: ToptipsService

    // private router: Router,
  ) { }

  ngOnInit() {
  }
  public  onSendCode(): void {
    console.log(123);
  }
  // submit change phone
  public  mineChangePhoneClick(): void {
    setTimeout( () => {
      this.onShow('success', '提交成功');

    }, 1000);
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
