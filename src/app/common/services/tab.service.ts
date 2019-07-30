import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TabService {
  constructor(
    private http: HttpClient
  ) {}
  // 房屋
  public tabGetHouseList(): Observable<any> {
    return this.http.post(environment.dev_test_url + `/indexroom`, {});
  }
  // public tabDeleteClient(id): Observable<any> {
  //   return this.http.post(`/contacts/delete`, {id: id});
  // }
  // public tabSearchClientList(params): Observable<any> {
  //   return this.http.post(`/contacts/nameLike`, params);
  // }
  // public tabGetClientAdrs(params): Observable<any> {
  //   return this.http.post(`/address/ListFindById`, params);
  // }
  // // get user info
  // public tabGetUserInfo(): Observable<any> {
  //   return this.http.post(`/member/userInfo`, {});
  // }
}
