import {Component, OnInit} from '@angular/core';
import {TabService} from '../../common/services/tab.service';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, PTRComponent, ToptipsService} from 'ngx-weui';
import {timer} from 'rxjs';
import {GlobalService} from '../../common/services/global.service';
@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less']
})
export class TabHomeComponent implements OnInit {
  public item: any;
  public HouseItem = [
    {imgUrl: 'assets/images/room.jpg', title: '房屋缴费', type: 'room'},
    {imgUrl: 'assets/images/parkingspace.jpg', title: '车位缴费', type: 'park'},
  ];
  constructor(
    private tabSrv: TabService,
    private router: Router,
    private globalSrv: GlobalService,
    private toptipSrv: ToptipsService,
  ) { }

  ngOnInit() {

  }
  public  typeClick(value): void {
      if (value.type === 'room'){
         this.router.navigate(['/chargepay/roomlist'])
      }else {
        this.router.navigate(['/chargepay/parklist'])
      }
  }

}
