import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PTRComponent} from 'ngx-weui';
import {timer} from 'rxjs';
import {MinePersionalInfoService} from '../../common/services/mine-persional-info.service';
import {MinePayInfoService} from '../../common/services/mine-pay-info.service';

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
  public owerPayInfo = [];
  public flag = 2;
  constructor(
    private minePayInfoSrv: MinePayInfoService
  ) { }

  ngOnInit() {
     this.initializationMinePayinfo(1);
  }
  public initializationMinePayinfo (pageNum): void {
    this.minePayInfoSrv.getMinePayInfo({pageNum: pageNum , pageSize: 10}).subscribe(
      (val) => {
           console.log(val);
           if (val.entity){
             val.entity.forEach( v => {
               this.owerPayInfo.push(
                 {data: [{label: '房间编号', value: v.roomCode}, {label: '缴费类型', value: v.chargeName}, {label: '缴费时间', value: v.date}], payValue: v.money},)
             });
           }

      });
  }
  // 下拉刷新
  public onRefresh(ptr: PTRComponent): void {
    timer(800).subscribe(() => {
      this.initializationMinePayinfo(this.flag);
      ptr.setFinished();
      this.flag = this.flag + 1;
      console.log(this.flag);
    });
  }
}
