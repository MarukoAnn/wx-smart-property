import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargeRoomInfoService {

  constructor(
    private http: HttpClient
  ) { }
  public  queryRoomInfo(pamars): Observable<any> {
      return this.http.post(environment.dev_test_url + `/houseinfo`, pamars);
  }
  public  queryRoomChargeInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/payment/user`, pamars);
  }
}
