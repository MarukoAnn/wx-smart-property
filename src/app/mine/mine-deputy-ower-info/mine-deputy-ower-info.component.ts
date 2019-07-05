import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {MineDeputyService} from '../../common/services/mine-deputy.service';

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
  public deputyInfo = [];
  public flag = 2;
  // public  userId: any;
  constructor(
    private router: Router,
    private mineDeputySrv: MineDeputyService,
    private toptipSrv: ToptipsService,
  ) { }

  ngOnInit() {
    this.mineDeputyInfoInit(1);
  }
  public mineDeputyInfoInit(page): void {
      this.mineDeputySrv.queryMineDeputyInfoList({pageNum: page, pageSize: 10, identity: 2}).subscribe(
        value => {
          console.log(value);
          this.deputyInfo = [];
          value.entity.forEach( v => {
            this.deputyInfo.push( {data: [
                {label: '姓名', value: v.userName},
                {label: '关联时间', value: v.date},
                {label: '详细地址', value: v.roomCode},
                {label: '房屋着落', value: v.address}
              ], userId: v.userId});
          });
          // this.onShow('success', '查询' + value.msg);
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
      // console.log(item);
    this.mineDeputySrv.deleteMineDeputyBindRoomCode({identity: 2, roomCode: item.data[2].value, userId: item.userId}).subscribe(
      value => {
        this.onShow('success', '删除' + value.msg);
        this.mineDeputyInfoInit(1);
      }
    );
  }
  // modify deputyInfo
  public  mineDeputyModifyClick(e): void {
      this.router.navigate(['mine/changedeputy'], {queryParams: {value: e.userId}});
  }
  // Detail deputyInfo
  public  mineDeputyDetailClick(e): void {
      // console.log(e);
    this.router.navigate(['mine/deputyDetail'], { queryParams: {value: e.userId}});
  }
  // add deputyInfo
  public  mineDeputyAddClick(): void {
      // console.log();
    this.router.navigate(['mine/deputyadd']);
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
