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
  public addTenant: AddMineTenant = new AddMineTenant();
  public loadHidden = true;
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
    const List = ['mobilePhone', 'realName', 'sex'];
    const  listStatus = List.some(v => {
      return this.addTenant[v] === undefined || this.addTenant[v] === null;
    });
    if (!listStatus) {
      if (this.addTenant.roomCodes.length > 0) {
        if (
          this.addTenant.roomCodes.some( val => {
            return val.startDate === undefined || val.endDate === undefined;
          })
        ) {
          this.onShow('warn', '请选择房子的租赁日期或者结束日期');
        } else {
          this.addTenant.roomCodes.forEach( v => {
            v.endDate = this.datePipe.transform(v.endDate, 'yyyy-MM-dd');
            v.startDate = this.datePipe.transform(v.startDate, 'yyyy-MM-dd');
          });
        }
      } else {
        this.globalSrv.wxSessionSetObject('addData', this.addTenant);
        this.router.navigate(['/mine/code'], {queryParams: {type: 'add', value: '3'}});
      }
    }

    // this.mineTenantSrv.addMineTennatInfo(this.addTenant).subscribe(
    //   value => {
    //     // console.log(value);
    //     this.loadHidden = true;
    //     this.onShow('success', '新增成功');
    //   }
    // );
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
  // 手机号验证
  public  inputNumberFocus(): void {

    if (this.verifyPhone.test(this.addTenant.userPhone)) {
      this.hiddenWarn = false;
      console.log(123);
    } else {
      this.hiddenWarn = true;
      console.log(456);
    }
  }
}
