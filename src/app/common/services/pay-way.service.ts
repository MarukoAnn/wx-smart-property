import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayWayService {

  constructor(
    private http: HttpClient
  ) { }
  public  getPayInfo(pamars): Observable<any> {
     return this.http.post(environment.dev_test_url + `/wx/paycharge`, pamars);
  }
  public  getPayMoney(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/wxchargepay`, pamars);
  }
}
