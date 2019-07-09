import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';
import {ChargepayUserInfoService} from '../../common/services/chargepay-user-info.service';
import {GlobalService} from '../../common/services/global.service';
import {PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';

@Component({
  selector: 'app-chargepay-user-info',
  templateUrl: './chargepay-user-info.component.html',
  styleUrls: ['./chargepay-user-info.component.less']
})
export class ChargepayUserInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '缴费人明细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public basicData = [
    {label: '缴费人', value: ''},
    {label: '电话', value: ''},
    {label: '房屋编号', value: ''},

  ];;
  public userinfodetail = [];
  public flag = 2;
  public userId: any;
  constructor(
    private getrouter: ActivatedRoute,
    private chargepayUserInfoSrv: ChargepayUserInfoService,
    private globalSrv: GlobalService,
    private toptipSrv: ToptipsService,

  ) { }

  ngOnInit() {
    this.getrouter.queryParams.subscribe((value) => {
      console.log(value.userId);
      this.userId = value.userId;
      this.userInRoomChargeListInit(1, value.userId);
    });
  }
  // user charge list init
  public  userInRoomChargeListInit(pageNum, userId): void {
     this.chargepayUserInfoSrv.getUserInRoomChargeList({pageNum: pageNum, pageSize: 10, userId: userId, roomCode: this.globalSrv.wxGet('roomCode')}).subscribe(
       (val) => {
         console.log(val);
         this.basicData[0].value = val.entity.surName;
         this.basicData[1].value = val.entity.mobilePhone;
         this.basicData[2].value = this.globalSrv.wxGet('roomCode');
         val.entity.payList.forEach( v => {
           if (v !== null) {
             this.userinfodetail.push( {data: [{label: '缴费时间', value: v.date}, {label: '缴费类型', value: v.chargeName}], payValue: v.money});
           }
         });
         this.onShow('success', val.msg);
       }
     );
  }
  // 下拉刷新
  onRefresh(ptr: PTRComponent) {
    timer(800).subscribe(() => {
     this.userInRoomChargeListInit(this.flag, this.userId);
     this.flag = this.flag + 1;
      ptr.setFinished();
    });
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
