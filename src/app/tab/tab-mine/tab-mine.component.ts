import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MineService} from '../../common/services/mine.service';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-tab-mine',
  templateUrl: './tab-mine.component.html',
  styleUrls: ['./tab-mine.component.less'],
})
export class TabMineComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '个 人 中 心',
    leftContent: {
      // icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '筛选',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public owerItemList = [
    {label: '个人资料', note: ''},
    {label: '修改手机号', note: ''},
    {label: '副业主信息', note: '仅业主可见'},
    {label: '租客信息', note: '仅业主、副业主可见'},
    {label: '我的缴费明细', note: ''},
    {label: '修改密码', note: ''},
  ];
  constructor(
    private mineSrv: MineService,
    private router: Router,
  ) { }

  ngOnInit() {}
  public  owerItemClick(e): void {
      console.log(e);
  }
}
