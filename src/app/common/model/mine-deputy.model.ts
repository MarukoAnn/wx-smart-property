export class ModeifyMineDeputy {
  sex?: any;
  userId?: any;
  userName?: any;
  userPhone?: any;
  roomCodes?: RoomCode[] = [];
}
export class RoomCodeList {
  roomCode?: any;
  startDate ?: any;
  endDate ?: any;
  organizationName ?: any;
  organizationId ?: any;
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

export class RoomCode {
  roomCode?: any;
  startDate ?: any;
  endDate ?: any;
}
