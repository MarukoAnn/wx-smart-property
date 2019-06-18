import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderContent} from '../../../common/components/header/header.model';

@Component({
  selector: 'app-mine-deputy-change-info',
  templateUrl: './mine-deputy-change-info.component.html',
  styleUrls: ['./mine-deputy-change-info.component.less']
})
export class MineDeputyChangeInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '副业主修改',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public duputyData = {
    name: '张先生',
    sex: '男',
    phone: '18283923823',
  };
  public checkbox: any[] = ['a', 'b'];
  constructor(
    private getRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value);
    });
  }

}
