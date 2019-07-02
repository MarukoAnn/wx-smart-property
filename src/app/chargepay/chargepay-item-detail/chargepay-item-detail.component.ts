import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ChargeItemService} from '../../common/services/charge-item.service';

@Component({
  selector: 'app-chargepay-item-detail',
  templateUrl: './chargepay-item-detail.component.html',
  styleUrls: ['./chargepay-item-detail.component.less']
})
export class ChargepayItemDetailComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '费 用 明 细',
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
  public chargeItemList = [];
  constructor(
    private router: Router,
    private chargeItemSrv: ChargeItemService,
    private getRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe(
      (value) => {
        this.roomcode = value.roomCode;
        console.log(value);
      }
    );
    if (this.roomcode) {
      this.chargeItemSrv.getChargeItem({roomCode: this.roomcode}).subscribe(
        (val) => {
          console.log(val);
          val.entity.forEach( v => {
            this.chargeItemList.push({label: v.chargeName, chargeCode: v.chargeCode, note: v.stateOfArrears, color: v.color});
          });
        }
      );

    }
  }

  public  chargepayItemClick(e): void {
      console.log(e);
      this.router.navigate(['/chargepay/month'], {queryParams: {chargeCode: e.chargeCode, roomCode: this.roomcode}});
  }
}
