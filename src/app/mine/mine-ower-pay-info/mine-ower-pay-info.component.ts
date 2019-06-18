import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PTRComponent} from 'ngx-weui';
import {timer} from 'rxjs';

@Component({
  selector: 'app-mine-ower-pay-info',
  templateUrl: './mine-ower-pay-info.component.html',
  styleUrls: ['./mine-ower-pay-info.component.less']
})
export class MineOwerPayInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '缴费明细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public owerPayInfo = [
    {data: [{label: '房间编号', value: 'A3-15-2406'}, {label: '缴费类型', value: '物业费'}, {label: '缴费时间', value: '2019-05-14'}], payValue: '34.5'},
    {data: [{label: '房间编号', value: 'A3-15-2406'}, {label: '缴费类型', value: '物业费'}, {label: '缴费时间', value: '2019-05-14'}], payValue: '24.5'},
    {data: [{label: '房间编号', value: 'A3-15-2406'}, {label: '缴费类型', value: '物业费'}, {label: '缴费时间', value: '2019-05-14'}], payValue: '53.5'},
  ];
  constructor() { }

  ngOnInit() {
  }
  // 下拉刷新
  public onRefresh(ptr: PTRComponent): void {
    timer(800).subscribe(() => {
      this.owerPayInfo.push(  {data: [{label: '房间编号', value: 'A3-15-2406'}, {label: '缴费类型', value: '物业费'}, {label: '缴费时间', value: '2019-05-14'}], payValue: '34.5'});
      ptr.setFinished();
    });
  }
}
