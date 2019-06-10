import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MineService} from '../../common/services/mine.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab-mine',
  templateUrl: './tab-mine.component.html',
  styleUrls: ['./tab-mine.component.less'],
})
export class TabMineComponent implements OnInit {
  constructor(
    private mineSrv: MineService,
    private router: Router,
  ) { }

  ngOnInit() {}
}
