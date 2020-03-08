import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {MineDeputyService} from '../../common/services/mine-deputy.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-mine-deputy-owner-info',
  templateUrl: './mine-deputy-ower-info.component.html',
  styleUrls: ['./mine-deputy-ower-info.component.less']
})
export class MineDeputyOwerInfoComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '副业主信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public verifyPhone: RegExp = /^1[37458]\d{9}$/;
  public deputyInfo = [
  ];
  public flag = 1;
  public deleteDeputy = {
    identity: '',
    roomCode: '',
    userId: '',
    verificationCode: ''
  };
  // public  userId: any;
  constructor(
    private router: Router,
    private mineDeputySrv: MineDeputyService,
    private toptipSrv: ToptipsService,
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {
    this.globalSrv.wxSessionRemove('roomList');
    this.mineDeputyInfoInit(1);
  }
  public mineDeputyInfoInit(page): void {
      this.mineDeputySrv.queryMineDeputyInfoList({pageNum: page, pageSize: 10, identity: 2}).subscribe(
        value => {
          console.log(value);
          if (value.code === '1000') {
            value.entity.forEach( v => {
              this.deputyInfo.push( {data: [
                  {label: '姓名', value: v.userName},
                  {label: '关联时间', value: v.date},
                  {label: '详细地址', value: v.roomCode},
                  {label: '房屋着落', value: v.address}
                ], userId: v.userId});
            });
          } else {
            this.onShow('warn', value.msg);
          }
        }
      );
  }
  // 下拉刷新
  onRefresh(ptr: PTRComponent) {
    timer(800).subscribe(() => {
      this.mineDeputyInfoInit(this.flag);
      this.flag ++;
      ptr.setFinished();
    });
  }
  // delete deputyInfo
  public  mineDeputyDeleteClick(item): void {
    console.log(item);
    this.deleteDeputy.identity = '2';
    this.deleteDeputy.roomCode = item.data[2].value;
    this.deleteDeputy.userId = item.userId;
    this.globalSrv.wxSessionSetObject('addData', this.deleteDeputy);
    this.router.navigate(['/mine/mineCode'], {queryParams: { type: 'delete',  value: '2'}});
  }
  // modify deputyInfo
  public  mineDeputyModifyClick(e): void {
    this.router.navigate(['mine/changedeputy'], {queryParams: {value: e.userId}});
  }
  // Detail deputyInfo
  public  mineDeputyDetailClick(e): void {
    this.router.navigate(['mine/deputyDetail'], { queryParams: {value: e.userId}});
  }
  // add deputyInfo
  public  mineDeputyAddClick(): void {
    this.router.navigate(['mine/deputyadd']);
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  public  backHome(): void {
    this.router.navigate(['/tab/mine']);
  }
}
