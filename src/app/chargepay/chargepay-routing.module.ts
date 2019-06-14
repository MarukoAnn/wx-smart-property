import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChargepayMonthComponent} from './chargepay-month/chargepay-month.component';
import {ChargepayItemDetailComponent} from './chargepay-item-detail/chargepay-item-detail.component';
import {ChargepayRoomInfoComponent} from './chargepay-room-info/chargepay-room-info.component';
import {ChargepayUserInfoComponent} from './chargepay-user-info/chargepay-user-info.component';

const routes: Routes = [
  {path: 'itemdetail', component: ChargepayItemDetailComponent},
  {path: 'month', component: ChargepayMonthComponent},
  {path: 'userinfo', component: ChargepayUserInfoComponent},
  {path: 'roominfo', component: ChargepayRoomInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargepayRoutingModule { }
