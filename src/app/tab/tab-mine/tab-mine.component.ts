import {Component, OnInit} from '@angular/core';
import {MineService} from '../../common/services/mine.service';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {GlobalService} from '../../common/services/global.service';
import {ToptipsService} from 'ngx-weui';

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
    {label: '个人资料', note: '', hide: true},
    {label: '副业主信息', note: '仅业主可见' , hide: true},
    {label: '租客信息', note: '仅业主、副业主可见', hide: true},
    {label: '我的缴费明细', note: '', hide: true},
    // {label: '修改密码', note: '', hide: false},
  ];
  public imageUrl: any;  // 头像地址
  public userName: any;  // 用户姓名
  public mobilePhone: any;  // 用户手机号
  constructor(
    private mineSrv: MineService,
    private router: Router,
    private globalSrv: GlobalService,
    private toptipSrv: ToptipsService,

  ) { }

  ngOnInit() {
    if (this.globalSrv.wxSessionGetObject('imageUrl') !== undefined){
      this.imageUrl = this.globalSrv.wxSessionGetObject('imageUrl');
    }
    this.mineSrv.mineGetUserInfo().subscribe(
        (value) => {
          if (value.entity) {
            this.userName = value.entity.userName;
            this.mobilePhone = value.entity.mobilePhone;
            if (value.entity.maxIdentity === '2') {
              this.owerItemList[1].hide = false;
            } else if (value.entity.maxIdentity === '3') {
              this.owerItemList[1].hide = false;
              this.owerItemList[2].hide = false;
            }
          } else {
            this.onShow('warn',value.msg)
          }
        }
      );
  }
  public  owerItemClick(e): void {
     switch (e.label) {
       case '个人资料': this.router.navigate(['/mine/persioninfo']); break;
       case '修改手机号': this.router.navigate(['/mine/modifyphone']); break;
       case '副业主信息': this.router.navigate(['/mine/deputyinfo']); break;
       case '租客信息': this.router.navigate(['/mine/tenantinfo']); break;
       case '我的缴费明细': this.router.navigate(['/mine/payinfo']); break;
       case '修改密码': this.router.navigate(['/mine/changepsw']); break;
       default: break;
     }
  }
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
