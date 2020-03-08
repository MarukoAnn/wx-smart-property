import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../common/services/login.service';
import {GlobalService} from '../common/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public wxCode: any = null;
  public wxOpenid: any = null;
  public url: any = null;
  // public headImgUrl: any;
  constructor(
    private router: Router,
    private getrouter: ActivatedRoute,
    private loginSrv: LoginService,
    private globalSrv: GlobalService,

  ) { }

  ngOnInit() {

    this.url = this.globalSrv.wxSessionGetObject('ios_url');
    this.getrouter.queryParams.subscribe(
      (value) => {
        // console.log(value);
        if (value.status === '2'){
          this.router.navigate(['/shop/shoplist']);
        }else {
          if (value.code) {
            this.wxCode = value.code;
            this.globalSrv.wxSessionSetObject('code', this.wxCode);
            this.getOpenid();
          } else {
            this.wxCode = this.url.split('?')[1].split('code=')[1].split('&')[0];
            this.globalSrv.wxSessionSetObject('code', this.wxCode);
            this.getOpenid();
          }
        }

      }
    );
    // this.getLogin('o_Jhq1AqGCADdhWrZLMcrX5NYMnE')
  }

  // getOpenid
  public  getOpenid(): void {
      if (this.wxCode) {
          this.loginSrv.getOpenid({code: this.wxCode}).subscribe(
            (value) => {
              if (value.entity.openId) {
                // value.entity.json()
                this.wxOpenid = value.entity.openId;
                // this.headImgUrl = value.entity.userInfo.headimgurl;
                this.globalSrv.wxSessionSetObject('openid', value.entity.openId);
                this.globalSrv.wxSessionSetObject('imageUrl', value.entity.userInfo.headimgurl);
                this.getLogin(value.entity.openId);
              }
            }
          );
      }
  }
  public getLogin (data): void {
     this.loginSrv.getLogin({openId: data}).subscribe(
       (value) => {
         console.log(value);
         if (value.entity.code === '1000') {
           this.globalSrv.wxSessionSetObject('appkey', value.entity.APPKEY);
           this.router.navigate(['/tab/home']);
         } else {
           this.router.navigate(['/registered']);
         }
       }
     );
  }
}
