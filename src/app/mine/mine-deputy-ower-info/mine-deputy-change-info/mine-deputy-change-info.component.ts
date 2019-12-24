import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig, InputType, SkinType, ToptipsService} from 'ngx-weui';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';
import {ModeifyMineDeputy} from '../../../common/model/mine-deputy.model';
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
    name: '',
    sex: '',
    phone: '',
  };
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public userId: any;
  public ModefyDeputy: ModeifyMineDeputy = new ModeifyMineDeputy();
  constructor(
    private getRouter: ActivatedRoute,
    private mineDeputySrv: MineDeputyService,
    private toptipSrv: ToptipsService,


  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      console.log(value);
      this.userId = value.value;
      this.mineDeputyInfoInit(value.value);
    });
  }

  public mineDeputyInfoInit(id): void {

    this.mineDeputySrv.queryMineDeputyInfoById({userId: id}).subscribe(
      value => {
        console.log(value);
        this.duputyData.name = value.entity.userName;
        this.duputyData.sex = value.entity.sex;
        this.duputyData.phone = value.entity.userPhone;
        // this.onShow('success', '查询成功');
      }
    );
    this.mineDeputySrv.queryMineDeputyBindRoomCode({userId: id, identity: 2 }).subscribe(
      val => {
        console.log(val);
        this.houseSelectData = [];
        val.entity.forEach( (v, index) => {
          this.houseSelectData.push({text: v, value: index + 1});
        });
      }
    );
    this.mineDeputySrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        console.log(value);
        this.owerRoomCodeList = [];
        value.entity.forEach( (v, index) => {
          this.owerRoomCodeList.push(  {text: v, value: index + 1});
        });
      }
    );
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
      backdrop: true,
      inputOptions: this.owerRoomCodeList,
    });
    setTimeout(() => {
      (<DialogComponent>this[`autoAS`]).show().subscribe((res: any) => {
        console.log(res);
        if (res.text === '确认') {
          if (res.result.length === 0) {
            this.autoAS.show();
            this.onShow('warn', '您未选择房间');
          } else {
            const list = [];
            res.result.forEach(v => {
              list.push(v.text);
            });
            this.mineDeputySrv.updateMineDeputyBindRoom({startDate: -1, userId: this.userId, identity: 2, roomCodes: list}).subscribe(
              value => {
                if (value.code === '1000') {
                  this.mineDeputyInfoInit(this.userId);
                }else {
                  this.onShow('warn', value.msg)
                }

              }
            );
            // res.result.forEach( v => {
            //   let flag = true;
            //   this.houseSelectData.forEach( item => {
            //     if (v.text === item.text) {
            //       flag = false;
            //     }
            //   });
            //   if (flag) {
            //     this.houseSelectData.push(v);
            //   }
            // });
          }
        }
      });
    }, 10);
    return false;
  }
  // 房间删除
  public  houseDelectClick(e): void {
      this.mineDeputySrv.deleteMineDeputyBindRoomCode({identity: 2, roomCode: e, userId: this.userId}).subscribe(
        (val) => {
          console.log(val);
          this.onShow('success', '删除成功');
          this.owerRoomCodeList = [];
          this.houseSelectData = [];
          this.mineDeputyInfoInit(this.userId);
        }
      );
  }
  // modify submit
  public  mineDeputyModifySureClick(): void {
      console.log(123);
    this.ModefyDeputy.sex = this.duputyData.sex;
    this.ModefyDeputy.userName = this.duputyData.name;
    this.ModefyDeputy.userPhone = this.duputyData.phone;
    this.ModefyDeputy.userId = this.userId;
      this.mineDeputySrv.updateMineDeputyInfo(this.ModefyDeputy).subscribe(
        value => {
          console.log(value);
          this.onShow('success', '修改成功');
          this.mineDeputyInfoInit(this.userId);
        }
      );
  }

  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
