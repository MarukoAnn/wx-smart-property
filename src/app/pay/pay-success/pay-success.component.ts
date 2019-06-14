import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.less']
})
export class PaySuccessComponent implements OnInit {

  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
  }

  public  payWayClick(): void {
      this.route.navigate(['tab/home']);
  }
}
