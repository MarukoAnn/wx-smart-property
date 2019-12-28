import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogComponent, DialogConfig, ToastComponent, ToptipsComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddMineTenant, ModifyMineTenant} from '../../../common/model/mine-tenant.model';
import {MineTenantService} from '../../../common/services/mine-tenant.service';
import {AddBasicDeputy, AddMineDeputy, AddUserIdentity, ModeifyMineDeputy} from '../../../common/model/mine-deputy.model';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../common/services/global.service';

@Component({
  selector: 'app-mine-tenant-modify',
  templateUrl: './mine-tenant-modify.component.html',
  styleUrls: ['./mine-tenant-modify.component.less']
})
export class MineTenantModifyComponent implements OnInit {
  @ViewChild('auto') autoAS: DialogComponent;
  @ViewChild('toptips') toptips: ToptipsComponent;

  public headerOption: HeaderContent = {
    title: '租客修改',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  // public tenantData = {
  //   name: '',
  //   sex: '',
  //   phone: '',
  // };
  public houseSelectData: any[] = [];
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public hiddenWarn: boolean;
  public verifyPhone: RegExp = /^1[37458]\d{9}$/;
  public modefyTenant: AddBasicDeputy = new AddBasicDeputy();
  public ModefyTenant: AddMineDeputy = new AddMineDeputy();
  public userIdentity: AddUserIdentity = new AddUserIdentity();
  public userId: any;
  constructor(
    private getRouter: ActivatedRoute,
    private router: Router,
    private toptipSrv: ToptipsService,
    private mineTenantSrv: MineTenantService,
    private datePipe: DatePipe,
    private globalSrv: GlobalService


  ) { }

  ngOnInit() {
    this.userIdentity.date = new Date();
    this.userIdentity.date = this.datePipe.transform(this.userIdentity.date, 'yyyy-MM-dd HH:MM:SS');
    this.userIdentity.identity = '3';
    this.getRouter.queryParams.subscribe((value) => {
      this.userId = value.value;
      this.modefyTenant.userId = value.value;
      if (this.globalSrv.wxSessionGetObject('roomList') === 0) {
        this.getRoomList(value.value);
      } else {
        this.houseSelectData = this.globalSrv.wxSessionGetObject('roomList');
      }
      this.mineDeputyInfoInit(value.value);
    });
  }

  public mineDeputyInfoInit(id): void {
    this.mineTenantSrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        value.entity.forEach( (v, index) => {
          this.owerRoomCodeList.push({text: v.roomCode, value: index + 1, organizationId: v.organizationId, organizationName: v.organizationName, startTime: '', endTime: ''});
        });
      }
    );
    this.mineTenantSrv.queryMineTennatInfoById({userId: id}).subscribe(
      value => {
        this.modefyTenant.realName = value.entity.userName;
        this.modefyTenant.sex = value.entity.sex;
        this.modefyTenant.mobilePhone = value.entity.userPhone;
      }
    );
  }
  // 查询房间
  public  getRoomList(id): void {
    this.mineTenantSrv.getMineTenantBindRoomCode({userId: id }).subscribe(
      val => {
        console.log(val);
        if (val.code === '1000') {
          val.entity.forEach(v => {
            this.houseSelectData.push({roomCode: v.roomCode, organizationId: v.organizationId, organizationName: v.organizationName, startTime: v.startTime, endTime: v.endTime});
          });
        } else {
          this.onShow(  'warn', val.msg);
        }
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
      inputOptions: this.owerRoomCodeList
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res);
        if (res.result === '') {
          this.onShow('warn', '操作错误,请选择房屋');
        } else if (res.text === '确认') {
          console.log(res.result);
          // this.houseSelectData = res.result;
            const result = this.houseSelectData.some(item => {
              return  item.roomCode === res.result.text;
            });
            if (!result) {
              this.houseSelectData.push({roomCode: res.result.text, organizationId: res.result.organizationId, organizationName: res.result.organizationName, startTime: '', endTime: ''});
            } else {
              this.onShow('warn', '该房屋已绑定');
            }
          // this.houseSetDate('开始');
        }
      });
    }, 10);
    return false;
  }
  public  houseDelectClick(e, index): void {
    this.houseSelectData.splice(index, 1);
    this.globalSrv.wxSessionSetObject('roomList', this.houseSelectData);
    // this.houseSelectData.splice(e, 1);
  }
  // modify submit
  public  mineTenantModifySureClick(): void {
    const List = ['mobilePhone', 'realName', 'sex'];
    const  listStatus = List.some(v => {
      return this.modefyTenant[v] === undefined || this.modefyTenant[v] === null;
    });
    this.houseSelectData.forEach( v => {
      this.ModefyTenant.roomList.push({startTime: v.startTime, endTime: v.endTime, roomCode: v.roomCode, organizationId: v.organizationId, organizationName: v.organizationName});
    });
    if (!listStatus) {
      this.ModefyTenant.user = this.modefyTenant;
      this.ModefyTenant.userIdentityEntity  = this.userIdentity;
      this.globalSrv.wxSessionSetObject('addData', this.ModefyTenant);
      // console.log(this.ModefyDeputy);
      this.router.navigate(['/mine/mineCode'], {queryParams: { type: 'modify',  value: '3'}});
    }
    // let submitBoolen = false;
    // this.ModefyTenant.roomList.forEach( v => {
    //   if (v.endTime === '' || v.endTime === '') {
    //     submitBoolen = true;
    //   }
    // });
    // if (submitBoolen) {
    //   this.onShow('warn', '请选择日期');
    // } else  {
    //   this.modifyTenant.userId = this.userId;
    //   this.modifyTenant.roomCodes.forEach( value => {
    //     value.startDate = this.datePipe.transform(value.startDate, 'yyyy-MM-dd');
    //     value.endDate = this.datePipe.transform(value.endDate, 'yyyy-MM-dd');
    //   });
      // console.log(this.modefyTenant);
      // this.mineTenantSrv.updateMineTennatInfo(this.modifyTenant).subscribe(
      //   value => {
      //     console.log(value);
      //     this.onShow('success', '修改成功');
      //   }
      // );
    // }
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
      this.toptipSrv[type](text);
  }

  public  backHome(): void {
    window.history.back();
  }

  // 手机号验证
  public  inputNumberFocus(): void {

    if (this.verifyPhone.test(this.modefyTenant.mobilePhone)) {
      this.hiddenWarn = false;
      console.log(123);
    } else {
      this.hiddenWarn = true;
      console.log(456);
    }
  }
}
