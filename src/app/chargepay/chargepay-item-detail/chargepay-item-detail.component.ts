import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chargepay-item-detail',
  templateUrl: './chargepay-item-detail.component.html',
  styleUrls: ['./chargepay-item-detail.component.less']
})
export class ChargepayItemDetailComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '费 用 明 细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public chargeItemList = [
    {label: '物业费', note: '欠费', Amount: '14', color: 'red'},
    {label: '停车费', note: '正常', Amount: '25', color: 'green'},
    {label: '二次加压费', note: '欠费', Amount: '37', color: 'red'},
  ];
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public  chargepayItemClick(e): void {
      console.log(e);
      this.router.navigate(['/chargepay/month'], {queryParams: {item: e.label}});
  }
}
