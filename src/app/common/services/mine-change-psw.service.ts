import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MineChangePswService {

  constructor(
    private http: HttpClient
  ) { }
  public updateMinePassword(pamars): Observable<any> {
      return this.http.post(environment.dev_test_url + `/wx/indexupdatepassword`, pamars);
  }
}
