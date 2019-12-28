import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MinePersionalInfoService} from '../../../common/services/mine-persional-info.service';
import {ToastComponent, ToptipsService} from 'ngx-weui';

@Component({
  selector: 'app-mine-persion-change-username',
  templateUrl: './mine-persion-change-username.component.html',
  styleUrls: ['./mine-persion-change-username.component.less']
})
export class MinePersionChangeUsernameComponent implements OnInit {
  @ViewChild('success') success: ToastComponent;

  public headerOption: HeaderContent = {
    title: '更改名字',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '保存',
      icon: '',
      color: '#7DB6F4'
    }
  };
  public nikeName = {
    nikeName: ''
  };
  constructor(
    private getRouter: ActivatedRoute,
    private minePerSrv: MinePersionalInfoService,
    private toptipSrv: ToptipsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value.value);
      this.nikeName.nikeName = value.value;
    });
  }
  // change name
  public mineUserNicUpdate(): void {
    // window.history.back();
    this.minePerSrv.updateUserName({ userName: this.nikeName.nikeName}).subscribe(
      (value) => {
        // console.log(value.ms);
        this.onShow('success', value.msg);
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
