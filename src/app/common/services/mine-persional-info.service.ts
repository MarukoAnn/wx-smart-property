import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinePersionalInfoService {

  constructor(
    private http: HttpClient
  ) { }
  // get userInfo
  public mineGetUserInfo(): Observable<any> {
      return this.http.post(environment.dev_test_url + `/wx/index`, {});
  }
  // get  ticket
  public  getTicket(): Observable<any> {
    return this.http.post(environment.dev_test_url + `/getticket`, {});
  }
  // change  username
  public  updateUserName(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/indexupdateusername`, pamars);
  }
}
