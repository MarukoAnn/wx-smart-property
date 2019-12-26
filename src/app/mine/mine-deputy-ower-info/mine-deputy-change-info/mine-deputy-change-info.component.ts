import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig, InputType, SkinType, ToptipsService} from 'ngx-weui';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';
import {ModeifyMineDeputy} from '../../../common/model/mine-deputy.model';
import {GlobalService} from '../../../common/services/global.service';
// import {type} from 'os';

@Component({
  selector: 'app-mine-deputy-change-info',
  templateUrl: './mine-deputy-change-info.component.html',
  styleUrls: ['./mine-deputy-change-info.component.less']
})
export class MineDeputyChangeInfoComponent implements OnInit {
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
    private router: Router,
    private globalSrv: GlobalService


  ) { }

  ngOnInit() {
    this.getRouter.queryParams.subscribe((value) => {
      this.userId = value.value;
      this.mineDeputyInfoInit(value.value);
      if (this.globalSrv.wxSessionGetObject('roomList') === 0) {
        this.getRoomList(value.value);
      } else {
        this.houseSelectData = this.globalSrv.wxSessionGetObject('roomList');
      }
    });
  }

  // 获取房间信息
  public  getRoomList(id): void {
    this.mineDeputySrv.queryMineDeputyBindRoomCode({userId: id, identity: 2}).subscribe(
      val => {
        console.log(val);
        this.houseSelectData = [];
        val.entity.forEach(v => {
          this.houseSelectData.push(v.roomCode);
        });
      }
    );
  }
  // 获取用户信息
  public mineDeputyInfoInit(id): void {
    this.mineDeputySrv.queryMineDeputyInfoById({userId: id}).subscribe(
      value => {
        this.duputyData.name = value.entity.userName;
        this.duputyData.sex = value.entity.sex;
        this.duputyData.phone = value.entity.userPhone;
      }
    );
    this.mineDeputySrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        console.log(value);
        this.owerRoomCodeList = [];
        value.entity.forEach( (v, index) => {
          this.owerRoomCodeList.push({text: v.roomCode, value: index + 1, organizationId: v.organizationId, organizationName: v.organizationName});
        });
      }
    );

  }
  // 选择房屋
  public  houseSelectClick() {
    if (this.owerRoomCodeList.length !== 0) {
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
              res.result.forEach(v => {
                // if (this.houseSelectData.forEach(val => {}))
                if (this.houseSelectData.indexOf(v.text) === -1
                 ) {
                  this.houseSelectData.push({roomCode: v.text, organizationId: v.organizationId, organizationName: v.organizationName, startDate: '', endDate: ''});
                } else {
                  this.onShow('warn', '该房屋已绑定');
                }
              });
              this.globalSrv.wxSessionSetObject('roomList', this.houseSelectData);
              // console.log(this.houseSelectData);
              // console.log(this.owerRoomCodeList);
              // this.mineDeputySrv.updateMineDeputyBindRoom({startDate: -1, userId: this.userId, identity: 2, roomCodes: list}).subscribe(
              //   value => {
              //     if (value.code === '1000') {
              //       this.mineDeputyInfoInit(this.userId);
              //     } else {
              //       this.onShow('warn', value.msg);
              //     }
              //   }
              // );
            }
          }
        });
      }, 10);
    } else {
      this.onShow('warn', '没有搜索到房屋');
    }
    return false;
  }
  // 房间删除
  public  houseDelectClick(e, index): void {
    // this.ModefyDeputy.roomCodes.push({roomCode: e, endDate: '', startDate: ''});
    this.houseSelectData.splice(index, 1);
    this.globalSrv.wxSessionSetObject('roomList', this.houseSelectData);
    // this.getRoomList();
      // this.mineDeputySrv.deleteMineDeputyBindRoomCode({identity: 2, roomCode: e, userId: this.userId}).subscribe(
      //   (val) => {
      //     console.log(val);
      //     if (val.code === '1000') {
      //       this.onShow('success', '删除成功');
      //       this.owerRoomCodeList = [];
      //       this.houseSelectData = [];
      //
      //     } else {
      //       this.onShow('warn', '删除失败');
      //     }
      //   }
      // );
  }
  // modify submit
  public  mineDeputyModifySureClick(): void {
    const List = ['phone', 'name', 'sex'];
    const  listStatus = List.some(v => {
      return this.duputyData[v] === undefined || this.duputyData[v] === null;
    });
    const roomList = this.globalSrv.wxSessionGetObject('roomList');
    roomList.forEach( v => {
      this.ModefyDeputy.roomCodes.push({startDate: '', endDate: '', roomCode: v});
    });
    if (!listStatus) {
        this.ModefyDeputy.sex = this.duputyData.sex;
        this.ModefyDeputy.userName = this.duputyData.name;
        this.ModefyDeputy.userPhone = this.duputyData.phone;
        this.ModefyDeputy.userId = this.userId;
        this.globalSrv.wxSessionSetObject('addData', this.ModefyDeputy);
        this.router.navigate(['/mine/mineCode'], {queryParams: { type: 'modify'}});
    }
  }
  // 显示提示信息
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
