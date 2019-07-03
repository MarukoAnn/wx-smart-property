import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {ChargeMonthService} from '../../common/services/charge-month.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-chargepay-month',
  templateUrl: './chargepay-month.component.html',
  styleUrls: ['./chargepay-month.component.less']
})
export class ChargepayMonthComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '月 数 选 择',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public monthDta = [];
  public roomCode: any;
  public chargeCode: any;
  constructor(
    private getrouter: ActivatedRoute,
    private router: Router,
    private chargeMonthSrv: ChargeMonthService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // this.router.snapshot.queryParams["item"];
    this.getrouter.queryParams.subscribe((value) => {
        this.roomCode = this.globalSrv.wxGet('roomCode');
        this.chargeCode = value.chargeCode;
        if (value) {
          this.chargeMonthSrv.getMonthPayment({roomCode: this.roomCode, chargeCode: value.chargeCode}).subscribe(
            (val) => {
              console.log(val);
              val.entity.forEach(v => {
                this.monthDta.push({label: v.datedif, oldMoney: v.oldMoney, newMoney: v.newMoney, discount: v.discount });
              });
            }
          );
        }
    });
  }

  public  monthSelectClick(e): void {
      console.log(e);
      this.router.navigate(['/pay/sure'], {queryParams: {chargeCode: this.chargeCode, roomCode: this.roomCode, month: e.label}});
  }
}
