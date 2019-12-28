import {Component, OnInit} from '@angular/core';
import {TabService} from '../../common/services/tab.service';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';
import {GlobalService} from '../../common/services/global.service';
@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less']
})
export class TabHomeComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '房 屋',
    leftContent: {
      // icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  // public HouseItem = [
  //   {
  //     imgUrl: 'assets/images/background.jpg',
  //     Content: [
  //       {label: '房屋着落', value: '贵州省贵阳市云城尚品小区', color: ''},
  //       {label: '详细地址', value: 'A3-15栋2406', color: ''},
  //       {label: '房间状态', value: '欠费', color: 'red'}],
  //   },
  //   {
  //     imgUrl: 'assets/images/background.jpg',
  //     Content: [
  //       {label: '房屋着落', value: '贵州省贵阳市云城尚品小区', color: ''},
  //       {label: '详细地址', value: 'A3-15栋2406', color: ''},
  //       {label: '房间状态', value: '欠费', color: 'red'}],
  //   }
  // ];
  public item: any;
  public HouseItem: any[] = [];
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
              imgUrl: v.photoPath,
              Content: [
                {label: '房屋坐落', value: v.address},
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
    this.globalSrv.wxSet('roomCode', e.Content[2].value);
    this.globalSrv.wxSet('organizationId', e.organizationId);
    this.router.navigate(['/chargepay/itemdetail']);

  }

  // room detail
  public  tabRoomDetailClick(e): void {
    console.log(e);
      // console.log(e.Content[2].value);
    this.globalSrv.wxSet('roomCode', e.Content[2].value);
    this.globalSrv.wxSet('organizationId', e.organizationId);
    this.router.navigate(['/chargepay/roominfo']);
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
