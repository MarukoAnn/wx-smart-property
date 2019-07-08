import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogComponent, DialogConfig, ToastComponent, ToptipsComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddMineTenant, ModifyMineTenant} from '../../../common/model/mine-tenant.model';
import {MineTenantService} from '../../../common/services/mine-tenant.service';
import {ModeifyMineDeputy} from '../../../common/model/mine-deputy.model';
import {DatePipe} from '@angular/common';

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
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public modifyTenant: ModifyMineTenant = new ModifyMineTenant();
  public userId: any;
  constructor(
    private getRouter: ActivatedRoute,
    private router: Router,
    private toptipSrv: ToptipsService,
    private mineTenantSrv: MineTenantService,
    private datePipe: DatePipe,


  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      this.userId = value.value;
      this.mineDeputyInfoInit(value.value);
    });

  }

  public mineDeputyInfoInit(id): void {
    this.mineTenantSrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        value.entity.forEach( (v) => {
          this.owerRoomCodeList.push(  {text: v});
        });
      }
    );
    this.mineTenantSrv.queryMineTennatInfoById({userId: id}).subscribe(
      value => {
        // console.log(value);
        this.modifyTenant.userName = value.entity.userName;
        this.modifyTenant.sex = value.entity.sex;
        this.modifyTenant.userPhone = value.entity.userPhone;
        // this.onShow('success', '查询成功');
      }
    );
    this.mineTenantSrv.getMineTenantBindRoomCode({userId: id }).subscribe(
      val => {
        console.log(val);
        this.modifyTenant.roomCodes = val.entity;
      }
    );
    this.modifyTenant = new AddMineTenant();
    this.modifyTenant.sex = 1;
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
          // this.houseSelectData = res.result;
          let flag = true;
          if (this.modifyTenant.roomCodes.length >= 1) {
            this.modifyTenant.roomCodes.forEach(  v => {
              if (v.roomCode === res.result.text) {
                flag = false;
              }
            });
            if (flag) {
              this.modifyTenant.roomCodes.push({roomCode: res.result.text, startDate: '', endDate: ''});
            } else {
              this.onShow('warn', '该房间已经选择');
            }
          } else {
            this.modifyTenant.roomCodes.push({roomCode: res.result.text, startDate: '', endDate: ''});
          }
          // this.houseSetDate('开始');
        }
      });
    }, 10);
    return false;
  }
  public  houseDelectClick(e): void {

    this.modifyTenant.roomCodes.splice(e, 1);
  }
  // modify submit
  public  mineTenantModifySureClick(): void {
    let submitBoolen = false;
    this.modifyTenant.roomCodes.forEach( v => {
      if (v.endDate === '' || v.endDate === '') {
        submitBoolen = true;
      }
    });
    if (submitBoolen) {
      this.onShow('warn', '请选择日期');
    } else  {
      this.modifyTenant.userId = this.userId;
      this.modifyTenant.roomCodes.forEach( value => {
        value.startDate = this.datePipe.transform(value.startDate, 'yyyy-MM-dd');
        value.endDate = this.datePipe.transform(value.endDate, 'yyyy-MM-dd');
      });
      console.log(this.modifyTenant);
      this.mineTenantSrv.updateMineTennatInfo(this.modifyTenant).subscribe(
        value => {
          console.log(value);
          this.onShow('success', '修改成功');
        }
      );
    }
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
      this.toptipSrv[type](text);
  }
}
