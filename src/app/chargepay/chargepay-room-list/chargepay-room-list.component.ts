import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {TabService} from '../../common/services/tab.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../common/services/global.service';
import {PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';

@Component({
  selector: 'app-chargepay-room-list',
  templateUrl: './chargepay-room-list.component.html',
  styleUrls: ['./chargepay-room-list.component.less']
})
export class ChargepayRoomListComponent implements OnInit {

  public headerOption: HeaderContent = {
    title: '房 屋 列 表',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public item: any;
  public HouseItem = [
    // {
    //   title: '贵阳市未来城',
    //   Content: [
    //       {label: '房屋详细', value: '贵阳市观山湖区天空之城A1地块1栋1单元'},
    //       {label: '房屋编号', value: 'TKZC-A1-D1-1DY-1001'},
    //       {label: '房屋状态', value: '正常'},
    //     ],
    // },
    // {
    //   title: '贵阳市未来城',
    //   Content: [
    //     {label: '房屋详细', value: '贵阳市观山湖区天空之城A1地块1栋1单元'},
    //     {label: '房屋编号', value: 'TKZC-A1-D1-1DY-1001'},
    //     {label: '房屋状态', value: '正常'},
    //   ],
    // }
  ];
  items: any[] = Array(20)
    .fill(0)
    .map((v: any, i: number) => i);
  constructor(
    private tabSrv: TabService,
    private router: Router,
    private globalSrv: GlobalService,
    private toptipSrv: ToptipsService,
  ) { }

  ngOnInit() {
    // console.log(this.HouseItem[0].Content);
    this.getHouseInfo();
  }

  public getHouseInfo (): void {
    this.tabSrv.tabGetHouseList().subscribe(
      (value) => {
        console.log(value);
        if (value.code === '1000') {
          this.HouseItem = [];
          value.entity.forEach( v => {
            this.HouseItem.push({
              title: v.address,
              Content: [
                {label: '房屋详细', value: v.roomInfo},
                {label: '房屋编号', value: v.roomCode},
                {label: '房屋状态', value: v.status},
              ],
              organizationId: v.organizationId
            });
          });
        } else  {
          this.onShow('warn', value.message);
        }
      });
  }
  // 下拉刷新
  onRefresh(ptr: PTRComponent) {
    timer(800).subscribe(() => {
      this.getHouseInfo();
      ptr.setFinished();
    });
  }
  // room payment
  public  tabPaymentClick(e): void {
    console.log(e);
    this.globalSrv.wxSet('roomCode', e.Content[1].value);
    this.globalSrv.wxSet('organizationId', e.organizationId);
    this.router.navigate(['/chargepay/itemdetail']);

  }

  // room detail
  public  tabRoomDetailClick(e): void {
    console.log(e);
    // console.log(e.Content[2].value);
    this.globalSrv.wxSet('roomCode', e.Content[1].value);
    this.globalSrv.wxSet('organizationId', e.organizationId);
    this.router.navigate(['/chargepay/roominfo']);
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  public  backHome(): void {
    window.history.back();
  }
}
