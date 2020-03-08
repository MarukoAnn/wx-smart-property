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
  // 车位租赁费
  public  getPayParkMoney(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/parkingRate/WxPay`, pamars);
  }
  // 获取转有车位费用信息
  public  getPrePayParkInfo(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/parkingRate/getInfoByParkingSpaceCode`, pamars);
  }

  // 支付转有车位费
  public  payPreParkMoney(pamars): Observable<any> {
    return this.http.post(environment.dev_test_url + `/parkingRate/parkingRateWxPay`, pamars);
  }
}
