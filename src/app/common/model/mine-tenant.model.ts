export class AddMineTenant {
  mobilePhone?: any;
  realName?: any;
  sex?: any;
  verificationCode?: any;
}
export class RoomData {
  endDate?: any;
  roomCode?: any;
  startDate?: any;
}
export class ModifyMineTenant {
  roomCodes?: RoomData[] = [];
  sex?: any;
  userName?: any;
  userPhone?: any;
  userId?: any;
}
