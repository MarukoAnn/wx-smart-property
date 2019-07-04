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
  public deleteMineTenantInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/payment/user` , pamars);
  }
  public queryMineDeputyInfoById(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/user/getinfo` , pamars);
  }
}
