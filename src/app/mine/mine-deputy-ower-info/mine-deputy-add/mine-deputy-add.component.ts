import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig} from 'ngx-weui';
import {ActivatedRoute} from '@angular/router';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';

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
  public duputyData = {
    name: '',
    sex: '1',
    phone: '',
  };
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public date: any;
  constructor(
    private getRouter: ActivatedRoute,
    private mineDeputySrv: MineDeputyService,

  ) { }

  ngOnInit() {
    // this.date = $filter('date')(new Date(),'MM/dd/yyyy');
    // console.log(this.date | date:'yyyy-MM-dd HH:mm:ss'} );
    // this.getRouter.queryParams.subscribe((value) => {
    //   console.log(value);
    //   this.duputyData.name = value.value;
    // });
    this.mineDeputyInfoInit();
  }
  public mineDeputyInfoInit(): void {
    this.mineDeputySrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        console.log(value);
        value.entity.forEach( (v, index) => {
          this.owerRoomCodeList.push(  {text: v, value: index + 1});
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
      input: 'checkbox',
      // inputValue: e,
      backdrop: true,
      inputOptions: this.owerRoomCodeList,
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res.result);
        if (res.text === '确认') {
          this.houseSelectData = res.result;
        }
      });
    }, 10);
    return false;
  }
  // deputy add submit
  public  mineDeputyAddSureClick(): void {
      console.log(123);
  }
}
