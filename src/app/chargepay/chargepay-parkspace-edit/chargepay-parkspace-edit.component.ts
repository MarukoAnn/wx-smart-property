import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ParkEditService} from '../../common/services/park-edit.service';
import {GlobalService} from '../../common/services/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivateRoutes} from '@angular/router/src/operators/activate_routes';
import {ToptipsService} from 'ngx-weui';

@Component({
  selector: 'app-chargepay-parkspace-edit',
  templateUrl: './chargepay-parkspace-edit.component.html',
  styleUrls: ['./chargepay-parkspace-edit.component.less']
})
export class ChargepayParkspaceEditComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '缴 费 月 份',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public parkingSpaceCostDetailDO = {
    licensePlateNumber: '',
    datedif: '',
    rentalRenewalStatus: '1',
  };
  public lincePlate: RegExp = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
  // public roomCode = 'WLC-A1-4-1-0201';
  public roomCode: any;
  public startime: any;
  public duetime: any;
  public datedif: any;
  public amountReceivable = 0;
  public actualMoneyCollection = 0 ;
  public chargeStandard: any;
  public rentalRenewalStatus: any;
  public parkingSpaceCode: any;
  public licensePlateNumber: any;
  public status: any;
  public organizationId: any;
  constructor(
    private getParkEditSrv: ParkEditService,
    private globalSrv: GlobalService,
    private router: Router,
    private getRouter: ActivatedRoute,
    private toptipSrv: ToptipsService,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe(
      (val) => {
        this.status = val.status;
        if (val.status === '3') {
          this.parkingSpaceCode = val.parkingSpaceCode;

        }
      }
    );
    this.organizationId = this.globalSrv.wxGet('organizationId');
    this.roomCode = this.globalSrv.wxGet('roomCode');
  }

  public submitEditClick(): void {
    if (this.status === '2') {
      if (this.parkingSpaceCostDetailDO.licensePlateNumber !== '' && this.parkingSpaceCostDetailDO.datedif !== '') {
        if (this.lincePlate.test(this.parkingSpaceCostDetailDO.licensePlateNumber)) {
          this.getParkEditSrv.getSubmitParkEditFree({organizationId: this.organizationId,roomCode: this.roomCode,  parkingSpaceCostDetailDO: this.parkingSpaceCostDetailDO}).subscribe(
            value => {
              if (value.code=== '1000'){
                value.entity.data.forEach(v => {
                  this.actualMoneyCollection += v.actualMoneyCollection;
                  this.amountReceivable += v.actualMoneyCollection;
                  this.parkingSpaceCode = v.parkingSpaceCode;
                  this.licensePlateNumber = v.licensePlateNumber;
                  this.rentalRenewalStatus = v.rentalRenewalStatus;
                  this.chargeStandard = v.chargeStandard;
                  this.duetime = v.dueTime;
                  this.startime = v.startTime;
                  this.datedif = v.datedif;
                });
                this.router.navigate(['/pay/paypark'], {queryParams: {status: 2,roomCode: this.roomCode,
                    actualMoneyCollection: this.actualMoneyCollection, amountReceivable: this.amountReceivable,
                    parkingSpaceCode: this.parkingSpaceCode, licensePlateNumber: this.licensePlateNumber,chargeStandard: this.chargeStandard,
                    dueTime: this.duetime, startTime: this.startime, datedif: this.datedif
                  }});
              }
            }
          )
        }else {
          this.onShow('warn', '您输入的车牌号不符合规则,请重新输入');
        }

      }else {
        this.onShow('warn', '参数未填写完');
      }
    }else  {
      if (this.parkingSpaceCostDetailDO.datedif !== ''){
        this.datedif = this.parkingSpaceCostDetailDO.datedif;
        this.router.navigate(['/pay/paypark'],{queryParams: {status: '3', parkingSpaceCode: this.parkingSpaceCode, datedif: this.datedif}});
      }else {
        this.onShow('warn', '参数未填写完');
      }

    }
  }
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  public  backHome(): void {
    window.history.back();
  }
}
