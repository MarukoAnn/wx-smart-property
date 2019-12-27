import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddMineDeputy} from '../../common/model/mine-deputy.model';
import {MineService} from '../../common/services/mine.service';
import {ToastService, ToptipsService} from 'ngx-weui';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-mine-code',
  templateUrl: './mine-code.component.html',
  styleUrls: ['./mine-code.component.less']
})
export class MineCodeComponent implements OnInit {

  public headerOption: HeaderContent = {
    title: '获取验证码',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  public addData:  AddMineDeputy = new AddMineDeputy();
  public verificationCode: any;
  public showData = '获取验证码';
  public type: any;
  constructor(
    private mineSrv: MineService,
    private toptipSrv: ToptipsService,
    private toastService: ToastService,
    private globalSrv: GlobalService,
    private router: Router,
    private getRouter: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    // this.getRouter.
    this.getRouter.queryParams.subscribe(
      value => {
        this.type = value.type;
      }
    );
  }

  public  getPhoneCode(): void {
    this.mineSrv.mineGetCode().subscribe(
      value => {
        if (value.code === '1000') {
          this.calc();
        } else {
          this.onShow('warn', value.msg);
          setTimeout(() => {
            this.showData = '重新发送';
          }, 1000);
        }
      }
    );
  }

  public  AddSureClick(): void {
    if (this.verificationCode !== undefined &&  this.verificationCode !== null) {
      this.setToast('loading');
      this.addData =  this.globalSrv.wxSessionGetObject('addData');
      this.addData.verificationCode = this.verificationCode;
      switch (this.type) {
        case 'add':  this.addDeputyInfo(); break;
        case 'modify':  this.modifyDeputyInfo(); break;
        case 'delete':  this.deleteDeputyInfo(); break;
        default: break;
      }
    } else {
      this.onShow('warn', '验证码不能为空');
    }
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }

  setToast(type: 'success' | 'loading') {
    this.toastService[type]();
  }

  public  calc(): void {
    let i = 60;
    const showSecond = setInterval(() => {
      if (i < 1) {
        clearInterval(showSecond);
        this.showData = '获取验证码';
      } else {
        this.showData = i + 's';
      }
      i--;
    }, 1000);
  }

  // 添加副业主
  public  addDeputyInfo(): void {
    this.mineSrv.addMineDeputyInfo(this.addData).subscribe(value => {
      if (value.code === '1000') {
        this.toastService.hide();
        this.setToast('success');
        this.router.navigate(['/mine/deputyinfo']);
      } else {
        this.onShow('warn', value.msg);
      }
    });
  }
  // 修改副业主信息
  public  modifyDeputyInfo(): void {
    this.mineSrv.updateMineDeputyInfo(this.addData).subscribe(
      value => {
        if (value.code === '1000') {
          this.toastService.hide();
          this.setToast('success');
          this.onShow('success', '修改成功');
          this.router.navigate(['/mine/deputyinfo']);
        } else {
          this.onShow('warn', value.msg);
        }
      }
    );
  }
  // 删除副业主信息
  public  deleteDeputyInfo(): void {
    this.mineSrv.deleteMineDeputyBindRoomCode(this.addData).subscribe(
      value => {
        if (value.code === '1000') {
          this.toastService.hide();
          this.setToast('success');
          this.onShow('success', '删除成功');
          this.router.navigate(['/mine/deputyinfo']);
        } else {
          this.onShow('warn', value.msg);
        }
      }
    );
  }
}
