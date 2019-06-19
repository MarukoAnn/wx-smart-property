import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogComponent, DialogConfig, ToptipsComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';

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
  public tenantData = {
    name: '',
    sex: '1',
    phone: '',
  };
  config: DialogConfig = {};
  public houseSelectData: any[] = [];
  public addHouseData: any[] = [];
  constructor(
    private getRouter: ActivatedRoute,
    private router: Router,
    private toptipSrv: ToptipsService
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value);
      this.tenantData.name = value.value;
    });
  }
  // public houseModifyClick(e) {
  //   const cog = Object.assign({}, <DialogConfig>{
  //     skin: 'auto',
  //     type: 'prompt',
  //     title: '请输入房间号',
  //     confirm: '确认',
  //     cancel: '',
  //     input: 'text',
  //     inputValue: e,
  //     backdrop: true,
  //     // inputOptions: [],
  //   });
  //   // cog.inputValue = this.houseSelectData;
  //   this.config = cog;
  //   setTimeout(() => {
  //     (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
  //       console.log(res.result);
  //       this.houseSelectData.forEach( v => {
  //         if (v.text === e) {
  //           v.text = res.result;
  //         }
  //       });
  //       // this.autoAS.hide();
  //       // (<DialogComponent>this[`autoAS`]).
  //       // this.houseSelectData = res.result;
  //       // this.mineSrv.mineUpdateUserName({sex: res.result.value}).subscribe(
  //       //   (val) => {
  //       //     if (val.status === 200) {
  //       //       this.updateSexMsg = '修改成功';
  //       //       this.tabMineDateInit();
  //       //       this.onToastShow('success');
  //       //       return;
  //       //     }
  //       //     this.updateSexMsg = `修改失败，错误代码：${val.status}`;
  //       //     this.onToastShow('success');
  //       //   }
  //       // );
  //     });
  //   }, 10);
  //   return false;
  // }

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
      inputOptions: [
        {text: 'YCSP-A3-15-2406', value: '1'},
        {text: 'YCSP-A3-15-2506', value: '2'},
        {text: 'YCSP-A3-15-2506', value: '3'},
      ],
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res.result);
        if (res.result === '') {
          this.onShow('warn', '请选择房屋');
        } else {
          if (res.text === '确认') {
            this.addHouseData = res.result;
            // this.houseSelectData = res.result;
            this.houseSetDate('开始');
          }
        }
        // this.autoAS.hide();
        // (<DialogComponent>this[`autoAS`]).
        // this.houseSelectData = res.result;
        // this.mineSrv.mineUpdateUserName({sex: res.result.value}).subscribe(
        //   (val) => {
        //     if (val.status === 200) {
        //       this.updateSexMsg = '修改成功';
        //       this.tabMineDateInit();
        //       this.onToastShow('success');
        //       return;
        //     }
        //     this.updateSexMsg = `修改失败，错误代码：${val.status}`;
        //     this.onToastShow('success');
        //   }
        // );
      });
    }, 10);
    return false;
  }
  // house setDate
  public  houseSetDate(e) {
    this.config = Object.assign({}, <DialogConfig>{
      skin: 'auto',
      type: 'prompt',
      title: '请输入租赁' + e + '时间',
      confirm: '确认',
      cancel: '取消',
      input: 'text',
      inputPlaceholder: '必填项    列如：(1995-04-05)',
      inputValue: '',
      backdrop: true,
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res);
        if (res.result === '') {
          this.onShow('warn', '请输入租赁' + e + '日期');
        } else {
          if (res.text === '确认') {
            if (e === '开始') {
              this.houseSetDate('截止');

            } else {
              console.log('结束');
              console.log(this.addHouseData);
              this.houseSelectData.push(this.addHouseData);
              // this.houseSelectData = this.addHouseData;

            }
            // this.houseSelectData = res.result;
          }
        }
      });
    }, 10);
    return false;
  }
  // deputy add submit
  public  mineTenantAddSureClick(): void {
    console.log(123);
    setTimeout(() => {
      this.onShow('primary', '提交成功');
      this.router.navigate(['/mine/tenantinfo']);
    }, 1000);
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
