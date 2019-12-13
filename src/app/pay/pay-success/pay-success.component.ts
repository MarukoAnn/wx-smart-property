import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.less']
})
export class PaySuccessComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public  payWayClick(): void {
    window.location.href = environment.dev_test_url+ '/wx/tab/home';
    // this.router.navigate(['/tab/home']);
  }
}
