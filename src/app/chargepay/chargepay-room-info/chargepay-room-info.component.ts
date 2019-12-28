import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {ChargeRoomInfoService} from '../../common/services/charge-room-info.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-chargepay-room-info',
  templateUrl: './chargepay-room-info.component.html',
  styleUrls: ['./chargepay-room-info.component.less']
})
export class ChargepayRoomInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '房屋基本信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '缴费明细',
      color: '#76B2F3',
      icon: ''
    }
  };
  public basicData = [
    {label: '房屋编号', value: ''},
    {label: '项目名', value: ''},
    {label: '地块', value: ''},
    {label: '楼栋', value: ''},
    {label: '单元', value: ''},
    {label: '面积', value: ''},
    // {label: '物业下次缴费时间', value: '2019-06-17'},
    // {label: '停车下次缴费时间', value: '2019-06-17'},
    // {label: '二次加压下次缴费时间', value: '2019-06-17'},
  ];
  public roomCode: any;
  public organizationId: any;
  constructor(
    private route: Router,
    private getRouter: ActivatedRoute,
    private roomSrv: ChargeRoomInfoService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.roomCode = this.globalSrv.wxGet('roomCode');
    this.organizationId = this.globalSrv.wxGet('organizationId');
    this.initializationRoomInfo(this.roomCode, this.organizationId);
  }

  public  initializationRoomInfo(Code, id): void {
      this.roomSrv.queryRoomInfo({roomCode: Code, organizationId: id}).subscribe(
        (value) => {
          this.basicData[0].value = value.entity.houseInfo.roomCode;
          this.basicData[1].value = value.entity.houseInfo.districtName + value.entity.houseInfo.villageName;
          this.basicData[2].value = value.entity.houseInfo.regionName;
          this.basicData[3].value = value.entity.houseInfo.buildingName;
          this.basicData[4].value = value.entity.houseInfo.unitName;
          this.basicData[5].value = value.entity.houseInfo.roomSize;
          if ( value.entity.chargeMaxTime) {
            value.entity.chargeMaxTime.forEach( v => {
              if (v.endTime !== null) {
                this.basicData.push({label: v.chargeStr, value: v.endTime});
              }
            });
          }
        }
      );
  }
  public  chargepaylistClick(e): void {
    this.route.navigate(['/pay/detail']);

  }
  public  tenantClick(): void {
      this.route.navigate(['/chargepay/tenant']);
  }
  public  deputeyClick(): void {
    this.route.navigate(['/chargepay/deputey']);

  }
  public  ownerClick(): void {
    this.route.navigate(['/chargepay/owner']);
  }
  public  backHome(): void {
    window.history.back();
  }
}
