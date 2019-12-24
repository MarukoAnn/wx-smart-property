import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig, ToptipsService} from 'ngx-weui';
import {ActivatedRoute} from '@angular/router';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';
import {AddBasicDeputy, AddMineDeputy, AddUserIdentity} from '../../../common/model/mine-deputy.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-mine-deputy-add',
  templateUrl: './mine-deputy-add.component.html',
  styleUrls: ['./mine-deputy-add.component.less']
})
export class MineDeputyAddComponent implements OnInit {
  @ViewChild('auto') autoAS: DialogComponent;
  public headerOption: HeaderContent = {
    title: '副业主添加',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  public duputyData: AddBasicDeputy = new AddBasicDeputy();
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public date: any;
  public addUserIdentity: AddUserIdentity = new AddUserIdentity();
  public addDeputy: AddMineDeputy = new AddMineDeputy();
  public loadHidden = true;
  public showData = '获取验证码';
  constructor(
    private getRouter: ActivatedRoute,
    private mineDeputySrv: MineDeputyService,
    private datePipe: DatePipe,
    private toptipSrv: ToptipsService,


  ) { }

  ngOnInit() {
    // this.date = $filter('date')(new Date(),'MM/dd/yyyy');
    this.addUserIdentity.date = new Date();
    this.addUserIdentity.date = this.datePipe.transform( this.addUserIdentity.date, 'yyyyMMdd');
    this.addUserIdentity.identity = 2;
    this.duputyData.sex = '男';
    // console.log(this.date | date:'yyyy-MM-dd HH:mm:ss'} );
    // this.getRouter.queryParams.subscribe((value) => {
    //   console.log(value);
    //   this.duputyData.name = value.value;
    // });

  }
  public mineDeputyInfoInit(): void {
    this.mineDeputySrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        console.log(value);
        if (value.code === '1000') {
          if (value.entity.length !== 0) {
            value.entity.forEach( (v, index) => {
              this.owerRoomCodeList.push({text: v, value: index + 1});
            });
            this.showDialog();
          } else {
            this.onShow('warn', '您暂时还没有房屋信息，请先去绑定房屋');
          }
        } else {
           this.onShow('warn', value.msg);
        }
      }
    );
  }

  public  houseSelectClick(): void {
    this.mineDeputyInfoInit();
  }
  public  showDialog(): void {
    this.config = Object.assign({}, <DialogConfig> {
      skin: 'auto',
      type: 'prompt',
      title: '请选择房间号',
      confirm: '确认',
      cancel: '取消',
      input: 'checkbox',
      // inputValue: e,
      backdrop: true,
      inputOptions: this.owerRoomCodeList,
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        if (res.text === '确认') {
          this.houseSelectData = res.result;
        }
      });
    }, 10);
  }
  // deputy add submit
  public  mineDeputyAddSureClick(): void {
    this.loadHidden = false;
      this.addDeputy = new AddMineDeputy();
    this.houseSelectData.forEach( v => {
      this.addDeputy.roomList.push(v.text);

    });
      this.addDeputy.user = this.duputyData;
      this.addDeputy.userIdentityEntity = this.addUserIdentity;
      this.mineDeputySrv.addMineDeputyInfo(this.addDeputy).subscribe(
        value => {
          this.loadHidden = true;
          this.onShow('success', '新增成功');
        }
      );
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  // setToast(type: 'success' | 'loading') {
  //   this.toastService[type]();
  // }

  public  getPhoneCode(): void {
    // if ((this.referrerData.realName !== undefined || this.referrerData.realName !== '') && this.referrerData.idNumber !== undefined && this.referrerData.idNumber !== '') {
    //   this.registeredSrv.getPhoneNumber({realName: this.referrerData.realName, idNumber: this.referrerData.idNumber }).subscribe(
    //     value => {
    //       console.log(value);
    //       if (value.code === '1000') {
    //         this.calc();
    //       } else {
    //         setTimeout(() => {
    //           this.showData = '重新发送';
    //         }, 1000);
    //       }
    //     }
    //   );
    //
    // }
  }

  public  calc(): void {
    let i = 60;
    const showSecond = setInterval(() => {
      if (i < 1) {
        clearInterval(showSecond);
        this.showData = '获取验证码';
      } else {
        this.showData = i + 's';
        console.log(this.showData);
      }
      i--;
    }, 1000);
  }
}
