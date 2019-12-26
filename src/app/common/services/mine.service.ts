import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor(
    private http: HttpClient
  ) { }
  // public mineGetQrImg(params): Observable<any> {
  //   return this.http.post('/member/qrCode', params);
  // }
  // // verify payPwd
  // public mineVerifyPayPwd(params): Observable<any> {
  //   return this.http.post('/orderPay/payPwd', params);
  // }
  // // setting payPwd
  // public mineSetPayPwd(params): Observable<any> {
  //   console.log(params);
  //   return this.http.post('/member/setPayPwd', params);
  // }
  // // get order number
  // public mineGetOrderNum(): Observable<any> {
  //   return this.http.post('/moayoOrder/selectOrderNum', {});
  // }
  // // get user info
  // public mineGetUserInfo(): Observable<any> {
  //   return this.http.post(`/member/userInfo`, {});
  // }
  // // update user info
  // public mineUpdateUserName(params): Observable<any> {
  //   console.log(params);
  //   return this.http.post(`/member/updateUserInfo`, params);
  // }
  // public mineGetUserInfo (): void {
  //
  // }
  // get userInfo
  public mineGetUserInfo(): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/index`, {});
  }
  public mineGetCode(): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/proprietorGetVerificationCode`, {});
  }
  // 添加 租客 副业主
  public  addMineDeputyInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/adduser`, pamars);
  }
 // 修改 租客 副业主
  public  updateMineDeputyInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/roomusersubmit`, pamars);
  }

  //  删除 租客 副业主
  public  deleteMineDeputyBindRoomCode(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/deputy/delete`, pamars);
  }
}
