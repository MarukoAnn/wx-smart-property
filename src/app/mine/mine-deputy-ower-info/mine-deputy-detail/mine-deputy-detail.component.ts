import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute} from '@angular/router';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';
import {ToptipsService} from 'ngx-weui';

@Component({
  selector: 'app-mine-deputy-detail',
  templateUrl: './mine-deputy-detail.component.html',
  styleUrls: ['./mine-deputy-detail.component.less']
})
export class MineDeputyDetailComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '详细信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public deputyDetailData = [
    {label: '姓名' , value: ''},
    {label: '性别' , value: ''},
    {label: '手机号' , value: ''},
  ];
  public userId: any;
  constructor(
    private getRouter: ActivatedRoute,
    private mineDeputySrv: MineDeputyService,
    private toptipSrv: ToptipsService,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe(
      value => {
        this.userId = value.value;
        this.mineDeputyInfoInit(this.userId);
      }
    );
  }
  public mineDeputyInfoInit(id): void {
    this.mineDeputySrv.queryMineDeputyInfoById({userId: id}).subscribe(
      value => {
        console.log(value);
        this.deputyDetailData[0].value = value.entity.userName;
        this.deputyDetailData[1].value = value.entity.sex;
        this.deputyDetailData[2].value = value.entity.userPhone;
        this.onShow('success', '查询成功');
      }
    );
  }
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  public  backHome(): void {
    window.history.back();
  }
}
