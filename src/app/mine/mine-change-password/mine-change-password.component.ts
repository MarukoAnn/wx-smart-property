import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {MineChangePswService} from '../../common/services/mine-change-psw.service';
import {ToptipsService} from 'ngx-weui';

@Component({
  selector: 'app-mine-chage-password',
  templateUrl: './mine-change-password.component.html',
  styleUrls: ['./mine-change-password.component.less']
})
export class MineChangePasswordComponent implements OnInit {
  public headerOption: HeaderContent = {
    title: '重置密码',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      // title: '缴费明细',
      // color: '#76B2F3',
      icon: ''
    }
  };
  public pswData = {
    oldpsw: '',
    newpsw: '',
    surepsw: '',
  };
  constructor(
    private mineChangePswSrv: MineChangePswService,
    private toptipSrv: ToptipsService,
  ) { }

  ngOnInit() {
  }

  public  mineChangePswSureClick(): void {
      console.log(123);
      if (this.pswData.surepsw === this.pswData.newpsw){
            this.mineChangePswSrv.updateMinePassword({newPsw: this.pswData.newpsw, oldPsw: this.pswData.oldpsw}).subscribe(
              (val) => {
               console.log(val);
                this.onShow('success', val.msg);
              }
            );
      } else {
         this.onShow('warn', '两次密码输入不一致');
      }
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
