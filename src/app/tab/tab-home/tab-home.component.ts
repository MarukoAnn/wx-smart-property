import {Component, OnInit} from '@angular/core';
import {TabService} from '../../common/services/tab.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less']
})
export class TabHomeComponent implements OnInit {
  constructor(
    private tabSrv: TabService,
    private router: Router,
  ) { }

  ngOnInit() {}
}
