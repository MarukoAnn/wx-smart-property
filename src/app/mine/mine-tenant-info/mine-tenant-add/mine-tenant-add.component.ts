import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogComponent, DialogConfig, ToptipsComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MineTenantService} from '../../../common/services/mine-tenant.service';
import {AddBasicDeputy, AddMineDeputy, AddUserIdentity} from '../../../common/model/mine-deputy.model';
import {DatePipe} from '@angular/common';
import {AddMineTenant} from '../../../common/model/mine-tenant.model';

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
  public showData = '获取验证码';
  public tenantData: AddBasicDeputy = new AddBasicDeputy();
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public date: any;
  public addTenant: AddMineTenant = new AddMineTenant();
  public loadHidden = true;
  constructor(
    private getRouter: ActivatedRoute,
    private router: Router,
    private toptipSrv: ToptipsService,
    private datePipe: DatePipe,
    private mineTenantSrv: MineTenantService
  ) { }

  ngOnInit() {
    // this.getRouter.queryParams.subscribe((value) => {
    //   console.log(value);
    //   this.tenantData.name = value.value;
    // });
    this.mineDeputyInfoInit();
  }
  public mineDeputyInfoInit(): void {
    this.mineTenantSrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        value.entity.forEach( (v) => {
          this.owerRoomCodeList.push(  {text: v});
        });
      }
    );
    this.addTenant = new AddMineTenant();
    this.addTenant.sex = '男';
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
            this.addTenant.roomCodes.push({roomCode: res.result.text, startDate: '', endDate: ''});
            this.houseSelectData.push(res.result);

          }
        }
      });
    }, 10);
    return false;
  }
  // deputy add submit
  public  mineTenantAddSureClick(): void {
    this.loadHidden = false;
    console.log(this.addTenant);

    this.addTenant.roomCodes.forEach( v => {
       v.endDate = this.datePipe.transform(v.endDate, 'yyyy-MM-dd');
       v.startDate = this.datePipe.transform(v.startDate, 'yyyy-MM-dd');
    });
    this.mineTenantSrv.addMineTennatInfo(this.addTenant).subscribe(
      value => {
        // console.log(value);
        this.loadHidden = true;
        this.onShow('success', '新增成功');
      }
    );
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  // public selectStartDate(e): void {
  //     console.log(e);
  // }
  // public selectEndDate (e): void {
  //     console.log(e);
  // }
  // 获取手机号
  public  getPhoneCode(): void {}
}
