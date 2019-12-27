import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderContent} from '../../../common/components/header/header.model';
import {DialogComponent, DialogConfig, InputType, SkinType, ToptipsService} from 'ngx-weui';
import {MineDeputyService} from '../../../common/services/mine-deputy.service';
import {AddBasicDeputy, AddMineDeputy, AddUserIdentity, ModeifyMineDeputy} from '../../../common/model/mine-deputy.model';
import {GlobalService} from '../../../common/services/global.service';
import {DatePipe} from '@angular/common';
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
  config: DialogConfig = {};
  public owerRoomCodeList: any[] = [];
  public houseSelectData: any[] = [];
  public userId: any;
  public modefyDeputy: AddBasicDeputy = new AddBasicDeputy();
  public ModefyDeputy: AddMineDeputy = new AddMineDeputy();
  public userIdentity: AddUserIdentity = new AddUserIdentity();
  constructor(
    private getRouter: ActivatedRoute,
    private mineDeputySrv: MineDeputyService,
    private toptipSrv: ToptipsService,
    private datePipe: DatePipe,
    private router: Router,
    private globalSrv: GlobalService


  ) { }

  ngOnInit() {
    // this.ModefyDeputy.userIdentityEntity.date = '';
    // this.ModefyDeputy.userIdentityEntity.identity = '2';
    this.userIdentity.date = '';
    this.userIdentity.identity = '2';
    this.getRouter.queryParams.subscribe((value) => {
      this.userId = value.value;
      this.mineDeputyInfoInit(value.value);
      this.modefyDeputy.userId = value.value;
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
          this.houseSelectData.push({roomCode: v.roomCode, organizationId: v.organizationId, organizationName: v.organizationName});
        });
      }
    );
  }
  // 获取用户信息
  public mineDeputyInfoInit(id): void {
    this.mineDeputySrv.queryMineDeputyInfoById({userId: id}).subscribe(
      value => {
        this.modefyDeputy.realName = value.entity.userName;
        this.modefyDeputy.sex = value.entity.sex;
        this.modefyDeputy.mobilePhone = value.entity.userPhone;
      }
    );
    this.mineDeputySrv.queryMineOwnerBindRoomCode().subscribe(
      (value) => {
        console.log(value);
        this.owerRoomCodeList = [];
        value.entity.forEach( (v, index) => {
          this.owerRoomCodeList.push({text: v.roomCode, value: index + 1, organizationId: v.organizationId, organizationName: v.organizationName, startDate: '', endDate: ''});
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
              console.log(this.houseSelectData);
              res.result.forEach(v => {
                const result = this.houseSelectData.some(item => {
                  return  item.roomCode === v.text;
                });
                if (!result) {
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
    const List = ['mobilePhone', 'realName', 'sex'];
    const  listStatus = List.some(v => {
      return this.modefyDeputy[v] === undefined || this.modefyDeputy[v] === null;
    });
    // const roomList = this.globalSrv.wxSessionGetObject('roomList');
    // console.log(roomList);
    // if (roomList !== 0 ) {
    //
    // }
    console.log(this.houseSelectData);
    this.houseSelectData.forEach( v => {
      this.ModefyDeputy.roomList.push({startDate: '', endDate: '', roomCode: v.roomCode, organizationId: v.organizationId, organizationName: v.organizationName});
    });
    if (!listStatus) {
        this.ModefyDeputy.user = this.modefyDeputy;
        this.ModefyDeputy.userIdentityEntity  = this.userIdentity;
        this.globalSrv.wxSessionSetObject('addData', this.ModefyDeputy);
        // console.log(this.ModefyDeputy);
        this.router.navigate(['/mine/mineCode'], {queryParams: { type: 'modify'}});
    }
  }
  // 显示提示信息
  onShow(type: 'warn' | 'info' | 'primary' | 'success' | 'default', text) {
    this.toptipSrv[type](text);
  }
}
