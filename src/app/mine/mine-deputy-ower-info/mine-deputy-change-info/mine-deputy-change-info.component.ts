import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig, InputType, SkinType} from 'ngx-weui';
// import {type} from 'os';

@Component({
  selector: 'app-mine-deputy-change-info',
  templateUrl: './mine-deputy-change-info.component.html',
  styleUrls: ['./mine-deputy-change-info.component.less']
})
export class MineDeputyChangeInfoComponent implements OnInit {
  // @ViewChild('ios') iosAS: DialogComponent;
  // @ViewChild('android') androidAS: DialogComponent;
  @ViewChild('auto') autoAS: DialogComponent;
  public headerOption: HeaderContent = {
    title: '副业主修改',
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
  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value);
      this.duputyData.name = value.value;
    });
  }
  public houseModifyClick(e) {
    const cog = Object.assign({}, <DialogConfig>{
      skin: 'auto',
      type: 'prompt',
      title: '请输入房间号',
      confirm: '确认',
      cancel: '',
      input: 'text',
      inputValue: e,
      backdrop: true,
      // inputOptions: [],
    });
    // cog.inputValue = this.houseSelectData;
    this.config = cog;
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res.result);
        this.houseSelectData.forEach( v => {
          if (v.text === e) {
            v.text = res.result;
           }
        });
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
    // return false;
  }
  public  houseSelectClick() {
    this.config = Object.assign({}, <DialogConfig>{
      skin: 'auto',
      type: 'prompt',
      title: '请选择房间号',
      confirm: '确认',
      cancel: '取消',
      input: 'checkbox',
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
        if (res.text === '确认') {
          this.houseSelectData = res.result;
        }
        // this.houseSelectData.forEach( v => {
        //   if (v.text === e) {
        //     v.text = res.result;
        //   }
        // });
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
  // 房间删除
  public  houseDelectClick(e): void {
      console.log(e);
      this.houseSelectData.splice(e, 1);
  }
  // modify submit
  public  mineDeputyModifySureClick(): void {
      console.log(123);
  }
}
