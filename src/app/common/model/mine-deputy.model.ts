export class ModeifyMineDeputy {
  identity?: any;
  roomCodes?: RoomCodeList[] = [];
  sex?: any;
  userId?: any;
  userName?: any;
  userPhone?: any;
}
export class RoomCodeList {
  roomCode?: any;
  startDate ?: any;
}
export class AddMineDeputy {
  user?: any;
  roomList?: RoomCodeList[] = [];
  userIdentityEntity?: any;
}
export class AddBasicDeputy {
  mobilePhone?: any;
  realName?: any;
  sex?: any;
}
export class AddUserIdentity{
  date?: any;
  identity?: any;
}
