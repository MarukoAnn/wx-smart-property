import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogComponent, DialogConfig, ToptipsComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MineTenantService} from '../../../common/services/mine-tenant.service';
import {AddBasicDeputy, AddMineDeputy, AddUserIdentity} from '../../../common/model/mine-deputy.model';
import {DatePipe} from '@angular/common';
import {AddMineTenant} from '../../../common/model/mine-tenant.model';
import {GlobalService} from '../../../common/services/global.service';

@Component({
  selector: 'app-mine-tenant-add',
  templateUrl: './mine-tenant-add.component.html',
  styleUrls: ['./mine-tenant-add.component.less']
})
export class MineTenantAddComponent implements OnInit {
  @ViewChild('auto') autoAS: DialogComponent;
  @ViewChild('toptips') toptips: ToptipsComponent;

  public headerOption: HeaderContent = {
    title: '租客添加',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public date: any;
  public addTenant: AddBasicDeputy = new AddBasicDeputy();
  public AddTenantDeputy: AddMineDeputy = new AddMineDeputy();
  public addUserIdentity: AddUserIdentity = new AddUserIdentity();
  public hiddenWarn: boolean;
  public verifyPhone: RegExp = /^1[37458]\d{9}$/;
  constructor(
    private getRouter: ActivatedRoute,
    private toptipSrv: ToptipsService,
    private datePipe: DatePipe,
    private mineTenantSrv: MineTenantService,
    private router: Router,
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {
    // this.getRouter.queryParams.subscribe((value) => {
    //   console.log(value);
    //   this.tenantData.name = value.value;
    // });
    this.addUserIdentity.date = new Date();
    this.addUserIdentity.date = this.datePipe.transform(this.addUserIdentity.date, 'yyyy-MM-dd HH:MM:SS');
    this.addUserIdentity.identity = '3';
    this.addTenant.sex = '男';
    this.mineDeputyInfoInit();
  }
  public mineDeputyInfoInit(): void {
    this.mineTenantSrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        console.log(value);
        value.entity.forEach( (v) => {
          this.owerRoomCodeList.push({text: v.roomCode, organizationId: v.organizationId, organizationName: v.organizationName});
        });
      }
    );

  }
  public  houseSelectClick() {
    this.config = Object.assign({}, <DialogConfig>{
      skin: 'auto',
      type: 'prompt',
      title: '请选择房间号',
      confirm: '确认',
      cancel: '取消',
      input: 'radio',
      // inputValue: e,
      backdrop: true,
      inputOptions: this.owerRoomCodeList,
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res);
        if (res.result === '') {
          this.onShow('warn', '请选择房屋');
        } else {
          if (res.text === '确认') {
            console.log(res.result);
            this.AddTenantDeputy.roomList.push({roomCode: res.result.text, startTime: '', endTime: '', organizationId: res.result.organizationId, organizationName: res.result.organizationName});
            this.houseSelectData.push(res.result);
          }
        }
      });
    }, 10);
    return false;
  }
  // deputy add submit
  public  mineTenantAddSureClick(): void {
    const List = ['mobilePhone', 'realName', 'sex'];
    const  listStatus = List.some(v => {
      return this.addTenant[v] === undefined || this.addTenant[v] === null;
    });
    console.log(listStatus);
    if (!listStatus) {
      if (this.AddTenantDeputy.roomList.length > 0) {
        // console.log(this.AddTenantDeputy.roomList.some( val => {
        //   return this.AddTenantDeputy.roomList[val] === undefined || this.AddTenantDeputy.roomList[val] === null;
        // }));
        if (
          this.AddTenantDeputy.roomList.some( val => {
            return val.startTime === '' || val.endTime === '';
          })
        ) {
          this.onShow('warn', '请选择房子的租赁日期或者结束日期');
        } else {
          this.AddTenantDeputy.roomList.forEach( v => {
            v.endTime = this.datePipe.transform(v.endTime, 'yyyy-MM-dd');
            v.startTime = this.datePipe.transform(v.startTime, 'yyyy-MM-dd');
          });
          this.AddTenantDeputy.user = this.addTenant;
          this.AddTenantDeputy.userIdentityEntity = this.addUserIdentity;
          this.globalSrv.wxSessionSetObject('addData', this.AddTenantDeputy);
          this.router.navigate(['/mine/mineCode'], {queryParams: {type: 'add'}});
        }
      } else {
        this.globalSrv.wxSessionSetObject('addData', this.AddTenantDeputy);
        this.router.navigate(['/mine/mineCode'], {queryParams: {type: 'add'}});
      }
    }
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  // 手机号验证
  public  inputNumberFocus(): void {

    if (this.verifyPhone.test(this.addTenant.mobilePhone)) {
      this.hiddenWarn = false;
      console.log(123);
    } else {
      this.hiddenWarn = true;
      console.log(456);
    }
  }
  public  backHome(): void {
    window.history.back();
  }
}
