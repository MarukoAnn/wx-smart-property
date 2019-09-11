import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ChargeRoomInfoService} from '../../common/services/charge-room-info.service';
import {PTRComponent} from 'ngx-weui';
import {timer} from 'rxjs';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-pay-detail',
  templateUrl: './pay-detail.component.html',
  styleUrls: ['./pay-detail.component.less']
})
export class PayDetailComponent implements OnInit {
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
  public basicData = [
    {label: '房屋编号', value: ''},
    {label: '项目名', value: ''},
    {label: '地块', value: ''},
    {label: '单元', value: ''},
    {label: '面积', value: ''},
    {label: '花园面积', value: ''},
  ];
  public paydetail = [];
  public roomCode: any;
  public flag = 2;
  constructor(
    private router: Router,
    private roomSrv: ChargeRoomInfoService,
    private getRouter: ActivatedRoute,
    private globalSrv: GlobalService,

  ) { }

  ngOnInit() {
    this.roomCode = this.globalSrv.wxGet('roomCode');
    this.initializationRoomInfo(this.roomCode);
  }
  public  initializationRoomInfo(Code): void {
    this.getRoomChargeInfo(1, this.roomCode);
    this.roomSrv.queryRoomInfo({roomCode: Code}).subscribe(
      (value) => {
        // this.basicData[0].valu
        console.log(value);
        this.basicData[0].value = value.entity.houseInfo.roomCode;
        this.basicData[1].value = value.entity.houseInfo.districtName + value.entity.houseInfo.villageName;
        this.basicData[2].value = value.entity.houseInfo.regionName;
        this.basicData[3].value = value.entity.houseInfo.buildingName;
        this.basicData[4].value = value.entity.houseInfo.unitName;
        this.basicData[5].value = value.entity.houseInfo.roomSize;
        this.basicData[6].value = value.entity.houseInfo.userName;
        this.basicData[7].value = value.entity.houseInfo.userPhone;
      }
    );
  }
  public  getRoomChargeInfo(pageNo, code): void {
    this.roomSrv.queryRoomChargeInfo({pageNum: pageNo, pageSize: 10, roomCode: code}).subscribe(
      (data) => {
        console.log(data.entity);
        data.entity.forEach( v => {
          this.paydetail.push({data: [{label: '缴费时间', value: v.date}, {label: '缴费类型', value: v.chargeName}, {label: '缴费人', value: v.userName}], payValue: v.money, userId: v.userId});
        });
      }
    );
  }
  // 下拉刷新
  onRefresh(ptr: PTRComponent) {
    timer(800).subscribe(() => {
      this.getRoomChargeInfo(this.flag,  this.roomCode);
      this.flag = this.flag + 1;
      ptr.setFinished();
    });
  }
  public  paydetailUserClick(e): void {
      console.log(e.userId);
      this.router.navigate(['/chargepay/userinfo'], {queryParams: {userId: e.userId}});
  }
}
