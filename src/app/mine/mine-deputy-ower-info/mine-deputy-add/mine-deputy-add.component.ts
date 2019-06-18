import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';

@Component({
  selector: 'app-mine-deputy-add',
  templateUrl: './mine-deputy-add.component.html',
  styleUrls: ['./mine-deputy-add.component.less']
})
export class MineDeputyAddComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '副业主增加',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
