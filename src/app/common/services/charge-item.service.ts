import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargeItemService {

  constructor(
    private http: HttpClient
  ) { }
  public  getChargeItem(pamars): Observable<any> {
      return this.http.post(environment.dev_test_url + `/wx/getpayment`, pamars);
  }
}
