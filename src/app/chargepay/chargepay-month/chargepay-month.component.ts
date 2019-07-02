import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {ChargeMonthService} from '../../common/services/charge-month.service';

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
  constructor(
    private getrouter: ActivatedRoute,
    private router: Router,
    private chargeMonthSrv: ChargeMonthService,
  ) { }

  ngOnInit() {
    // this.router.snapshot.queryParams["item"];
    this.getrouter.queryParams.subscribe((value) => {
        console.log(value.roomCode);
        console.log(value.roomCode);
        if (value) {
          this.chargeMonthSrv.getMonthPayment({roomCode: value.roomCode, chargeCode: value.chargeCode}).subscribe(
            (val) => {
              console.log(val);
              val.entity.forEach(v => {
                this.monthDta.push({label: v.datedif, oldMoney: v.oldMoney, newMoney: v.newMoney, discount: v.discount })
              })
            }
          );
        }
    });
  }

  public  monthSelectClick(e): void {
      console.log(e);
      this.router.navigate(['/pay/sure']);
  }
}
