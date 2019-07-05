import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineTenantService {

  constructor(
    private http: HttpClient
  ) { }
  public queryMineTenantInfoList(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/indexroomuser` , pamars);
  }
  public  getMineTenantBindRoomCode(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/gettenantroom`, pamars);
  }
  public  deleteMineTenantBindRoomCode(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/deputy/delete`, pamars);
  }
  public queryMineTennatInfoById(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/user/getinfo` , pamars);
  }
  public  addMineTennatInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/addtenantuser`, pamars);
  }
  public  updateMineTennatInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/updatetenantroom`, pamars);
  }
  public  queryMineOwnerBindRoomCode(): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/getroomcodes`, {});
  }
}
