import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineDeputyService {

  constructor(
    private http: HttpClient
  ) { }
  public queryMineDeputyInfoList(pamars): Observable<any> {
      return this.http.post(environment.dev_test_url + `/wx/indexroomuser` , pamars);
  }
  // public deleteMineDeputyInfo(pamars): Observable<any> {
  //     return this.http.post(environment.dev_test_url + `/wx/payment/user` , pamars);
  // }
  public queryMineDeputyInfoById(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/user/getinfo` , pamars);
  }
  public  queryMineDeputyBindRoomCode(pamars): Observable<any> {
      return this.http.post(environment.dev_test_url + `/wx/getroomcodesbyidentity`, pamars);
  }
  public  queryMineOwnerBindRoomCode(): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/getroomcodes`, {});
  }
  public  deleteMineDeputyBindRoomCode(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/deputy/delete`, pamars);
  }
  public  addMineDeputyInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/adduser`, pamars);
  }
  public  updateMineDeputyInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/roomusersubmit`, pamars);
  }
  public  updateMineDeputyBindRoom(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/addroomuserininedx`, pamars);
  }
}
