import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';

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
  public monthDta = [
    {label: '1个月', RAmount: 10, PaiAmount: 9.8, discount: 9.8 },
    {label: '2个月', RAmount: 20, PaiAmount: 19.6, discount: 9.8 },
    {label: '3个月', RAmount: 30, PaiAmount: 28.5, discount: 9.5 },
    {label: '4个月', RAmount: 40, PaiAmount: 38, discount: 9.5 },
    {label: '5个月', RAmount: 50, PaiAmount: 47.5, discount: 9.5 },
    {label: '6个月', RAmount: 60, PaiAmount: 55.2, discount: 9.2 },
    {label: '7个月', RAmount: 70, PaiAmount: 65.4, discount: 9.2 },
    {label: '8个月', RAmount: 80, PaiAmount: 73.4, discount: 9.2 },
    {label: '9个月', RAmount: 90, PaiAmount: 81, discount: 9.0 },
    {label: '10个月', RAmount: 100, PaiAmount: 90, discount: 9.0 },
    {label: '11个月', RAmount: 110, PaiAmount: 99, discount: 9.0 },
    {label: '12个月', RAmount: 120, PaiAmount: 102, discount: 8.5 },
];
  constructor(
    private getrouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.router.snapshot.queryParams["item"];
    this.getrouter.queryParams.subscribe((value) => {
        console.log(value.item);
    });
  }

  public  monthSelectClick(e): void {
      console.log(e);
      this.router.navigate(['/pay/sure']);
  }
}
