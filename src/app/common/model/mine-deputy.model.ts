export class ModeifyMineDeputy {
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
  user?: AddBasicDeputy;
  roomList?: RoomCodeList[] = [];
  userIdentityEntity?: AddUserIdentity;
  verificationCode?: any;
}
export class AddBasicDeputy {
  mobilePhone?: any;
  realName?: any;
  sex?: any;
}
export class AddUserIdentity {
  date?: any;
  identity?: any;
  endData?: any;
}
