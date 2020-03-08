import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig, ToptipsService} from 'ngx-weui';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';
import {AddBasicDeputy, AddMineDeputy, AddUserIdentity} from '../../../common/model/mine-deputy.model';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../common/services/global.service';

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
  public verifyPhone: RegExp = /^1[37458]\d{9}$/;
  public hiddenWarn: any;
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public date: any;
  public addUserIdentity: AddUserIdentity = new AddUserIdentity();
  public addDeputy: AddMineDeputy = new AddMineDeputy();
  public loadHidden = true;
  constructor(
    private getRouter: ActivatedRoute,
    private mineDeputySrv: MineDeputyService,
    private datePipe: DatePipe,
    private toptipSrv: ToptipsService,
    private router: Router,
    private globalSrv: GlobalService


  ) { }

  ngOnInit() {
    // this.date = $filter('date')(new Date(),'MM/dd/yyyy');
    if (this.globalSrv.wxSessionGetObject('addData') !== 0) {
      this.duputyData.idNumber = this.globalSrv.wxSessionGetObject('addData').user.idNumber;
      this.duputyData.mobilePhone = this.globalSrv.wxSessionGetObject('addData').user.mobilePhone;
      this.duputyData.sex = this.globalSrv.wxSessionGetObject('addData').user.sex;
      this.duputyData.realName = this.globalSrv.wxSessionGetObject('addData').user.realName;
      this.globalSrv.wxSessionGetObject('addData').roomList.forEach(v => {
        this.houseSelectData.push({text: v.roomCode})
      })
    }
    this.addUserIdentity.date = new Date();
    this.addUserIdentity.date = this.datePipe.transform(this.addUserIdentity.date, 'yyyy-MM-dd HH:MM:SS');
    this.addUserIdentity.identity = 2;
    this.duputyData.sex = '男';

  }
  public mineDeputyInfoInit(): void {
    this.owerRoomCodeList = [];
    this.mineDeputySrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        if (value.code === '1000') {
          if (value.entity.length !== 0) {
            value.entity.forEach( (v, index) => {
              this.owerRoomCodeList.push({text: v.roomCode, value: index + 1, organizationId: v.organizationId, organizationName: v.organizationName});
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
    if (this.owerRoomCodeList.length !== 0) {
      this.config = Object.assign({}, <DialogConfig> {
        skin: 'auto',
        type: 'prompt',
        title: '请选择房间号',
        confirm: '确认',
        cancel: '取消',
        input: 'checkbox',
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
    }else {
      this.onShow('warn', '没有搜索到房屋，请联系管理员')
    }
  }
  // deputy add submit
  public  mineDeputyAddSureClick(): void {

      const List = ['mobilePhone', 'realName', 'sex', 'idNumber'];
      const  listStatus = List.some(v => {
        return this.duputyData[v] === undefined || this.duputyData[v] === null;
      });
      if (!listStatus) {
        if (this.hiddenWarn) {
          this.onShow('warn', '请输入正确的手机号');
        } else if (this.houseSelectData.length !== 0) {
          this.addDeputy = new AddMineDeputy();
          this.houseSelectData.forEach( v => {
            this.addDeputy.roomList.push({
              roomCode: v.text,
              organizationId: v.organizationId,
              organizationName: v.organizationName,
              startTime: '',
              endTime: '',
            });
          });
          this.addDeputy.user = this.duputyData;
          this.addDeputy.userIdentityEntity = this.addUserIdentity;
          this.globalSrv.wxSessionSetObject('addData', this.addDeputy);
          this.router.navigate(['/mine/mineCode'], {queryParams: { type: 'add', value: '2'}});
        } else  {
          this.onShow('warn', '请选择房屋');
        }
      } else {
        this.onShow('warn', '您有信息未填写完整');
      }
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }

  // 身份证验证
  public  inputNumberFocus(): void {
    if (this.verifyPhone.test(this.duputyData.mobilePhone)) {
      this.hiddenWarn = false;
    } else {
      this.hiddenWarn = true;
    }
  }
  public  backHome(): void {
    this.globalSrv.wxSessionRemove('addData');
    window.history.back();
  }
}
