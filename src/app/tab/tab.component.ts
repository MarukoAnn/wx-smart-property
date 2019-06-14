import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less']
})
export class TabComponent implements OnInit {
  public tabActive: string;
  public rouStatus: string = null;
  constructor(
    private router: Router,
    private location: Location,
    private titleServices: Title,
  ) {
     router.events.subscribe(
       (event) => {
         if (event instanceof NavigationEnd) {
           // console.log(event);
           this.tabActive = event.urlAfterRedirects.split('/')[2];
           this.rouStatus = event.urlAfterRedirects.split('/')[2];
           // console.log(this.tabActive, this.rouStatus);
         }
       }
     );
  }

  ngOnInit() {
    this.titleServices.setTitle('首页');
  }
  public onSelect(name, event): void {
    this.router.navigate([`/tab/${name}`]);
    if (name === 'home') {
      event.icon = `<img src=./assets/images/home-ac.png>`;
      this.titleServices.setTitle('首页');
    }
    if (name === 'mine') {
      event.icon = `<img src=./assets/images/mine-ac.png>`;
      this.titleServices.setTitle('我的');
      return;
    }
  }
  public onDeselect(event): void {
    if (event.heading === '首页') {
      event.icon = `<img src=./assets/images/home.png>`;
    }
    if (event.heading === '我的') {
      event.icon = `<img src=./assets/images/mine.png>`;
      return;
    }
  }
}
