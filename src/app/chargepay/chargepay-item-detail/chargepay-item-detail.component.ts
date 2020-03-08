import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ChargeItemService} from '../../common/services/charge-item.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-chargepay-item-detail',
  templateUrl: './chargepay-item-detail.component.html',
  styleUrls: ['./chargepay-item-detail.component.less']
})
export class ChargepayItemDetailComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '缴 费 项 目',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public roomcode: any;
  public organizationId: any;
  public chargeItemList = [
    {label: '月卡车位服务费', chargeCode: 'CWZLF' , note: '正常', color: 'red', status: 2, monthlyArrears: '', dueTime: '', amountOfArrears: ''},
    // {label: '物业费', chargeCode: 12323, note: '正常', color: 'green', status: 1, monthlyArrears: '', dueTime: '', amountOfArrears: ''},
  ];
  constructor(
    private router: Router,
    private chargeItemSrv: ChargeItemService,
    private getRouter: ActivatedRoute,
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {
    // this.getRouter.queryParams.subscribe(
    //   (value) => {
    //     this.roomcode = value.roomCode;
    //     console.log(value);
    //   }
    // );
    this.roomcode =  this.globalSrv.wxGet('roomCode');
    this.organizationId =  this.globalSrv.wxGet('organizationId');
    if (this.roomcode) {
      this.chargeItemSrv.getChargeItem({roomCode: this.roomcode, organizationId: this.organizationId}).subscribe(
        (val) => {
          val.entity.forEach( v => {
            this.chargeItemList.unshift(
               {label: v.chargeName, chargeCode: v.chargeCode, note: v.stateOfArrears, color: v.color, status: v.status, amountOfArrears: v.amountOfArrears, dueTime: v.dueTime, monthlyArrears: v.monthlyArrears}
              );
          });
        }
      );
    }
  }

  public  chargepayItemClick(e): void {
      if (e.status === 'true') {
        this.router.navigate(['/chargepay/month'], {queryParams: {chargeCode: e.chargeCode}});
      } else if (e.status === 2){
        this.router.navigate(['/chargepay/editPark'], {queryParams: {status: e.status}});
      }else {
        this.router.navigate(['/pay/sure'], {queryParams: {chargeCode: e.chargeCode}});
      }
  }

  public  backHome(): void {
    window.history.back();
  }
}
