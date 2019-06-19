import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogComponent, DialogConfig, ToastComponent, ToptipsComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {ActivatedRoute, Router} from '@angular/router';

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
  public duputyData = {
    name: '张先生',
    sex: '男',
    phone: '18283923823',
  };
  config: DialogConfig = {};
  public houseSelectData: any[] = [
    {text: 'YCSP-A3-15-2406', value: '1'},
    {text: 'YCSP-A3-15-2506', value: '2'},
    {text: 'YCSP-A3-15-2506', value: '3'},
  ];
  constructor(
    private getRouter: ActivatedRoute,
    private router: Router,
    private toptipSrv: ToptipsService
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value);
      this.duputyData.name = value.value;
    });
  }
  // house modify
  public houseModifyClick(e) {
    const cog = Object.assign({}, <DialogConfig>{
      skin: 'auto',
      type: 'prompt',
      title: '请输入房间号',
      confirm: '确认',
      cancel: '取消',
      input: 'text',
      inputValue: e,
      backdrop: true,
      // inputOptions: [],
    });
    // cog.inputValue = this.houseSelectData;
    this.config = cog;
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res);

        if (res.text === '确认') {
          this.houseSelectData.forEach( v => {
            if (v.text === e) {
              v.text = res.result;
            }
          });
        }
      });
    }, 10);
    // return false;
  }
  // house select
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
        console.log(res);
        if (res.result === '') {
          this.onShow('warn', '操作错误,请选择房屋');
        }else if (res.text === '确认') {
          // this.houseSelectData = res.result;
          this.houseSetDate('开始');
        }
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
            }
            // this.houseSelectData = res.result;
          }
        }
      });
    }, 10);
    return false;
  }
  // house delete
  public  houseDelectClick(e): void {
    console.log(e);
    this.houseSelectData.splice(e, 1);
  }
  // modify submit
  public  mineTenantModifySureClick(): void {
    console.log(123);
    setTimeout( () => {
      this.onShow('success', '提交成功');
      this.router.navigate(['/mine/tenantinfo']);
    });
  }
  // toast
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
      this.toptipSrv[type](text);
  }
}
