import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';

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
    private getRouter : ActivatedRoute,
    // private router: Router,
  ) { }

  ngOnInit() {
  }
  public  onSendCode(): void {
    console.log(123);
  }
}
