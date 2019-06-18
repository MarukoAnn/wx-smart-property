import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mine-persion-change-username',
  templateUrl: './mine-persion-change-username.component.html',
  styleUrls: ['./mine-persion-change-username.component.less']
})
export class MinePersionChangeUsernameComponent implements OnInit {
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
    // private router: Router,
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value.value);
      this.nikeName.nikeName = value.value;
    });
  }
  // change name
  public mineUserNicUpdate(): void {
    console.log(123);
    window.history.back();
    // this.mineSrv.mineUpdateUserName(this.nikeName).subscribe(
    //   (val) => {
    //     if (val.status === 200) {
    //       this.updateNicMsg = '修改成功';
    //       this.onToastShow('success');
    //       timer(1000).subscribe(
    //         (time) => {
    //           window.history.back();
    //         }
    //       );
    //       return;
    //     }
    //     this.updateNicMsg = `修改失败，错误代码：${val.status}`;
    //     this.onToastShow('success');
    //   }
    // );
  }
}
