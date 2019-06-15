import {Component, Input, OnInit} from '@angular/core';
import {ListData} from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  @Input() public data: ListData = new ListData();
  constructor() { }

  ngOnInit() {
  }

}
