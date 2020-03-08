import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChargepayMonthComponent} from './chargepay-month/chargepay-month.component';
import {ChargepayItemDetailComponent} from './chargepay-item-detail/chargepay-item-detail.component';
import {ChargepayRoomInfoComponent} from './chargepay-room-info/chargepay-room-info.component';
import {ChargepayUserInfoComponent} from './chargepay-user-info/chargepay-user-info.component';
import {ChargepayRoomTenantComponent} from './chargepay-room-tenant/chargepay-room-tenant.component';
import {ChargepayRoomDeputeyComponent} from './chargepay-room-deputey/chargepay-room-deputey.component';
import {ChargepayCouponComponent} from './chargepay-coupon/chargepay-coupon.component';
import {ChargepayOwnerInfoComponent} from './chargepay-owner-info/chargepay-owner-info.component';
import {ChargepayRoomListComponent} from './chargepay-room-list/chargepay-room-list.component';
import {ChargepayParkspaceListComponent} from './chargepay-parkspace-list/chargepay-parkspace-list.component';
import {ChargepayParkspaceEditComponent} from './chargepay-parkspace-edit/chargepay-parkspace-edit.component';

const routes: Routes = [
  {path: 'itemdetail', component: ChargepayItemDetailComponent},
  {path: 'month', component: ChargepayMonthComponent},
  {path: 'userinfo', component: ChargepayUserInfoComponent},
  {path: 'roominfo', component: ChargepayRoomInfoComponent},
  {path: 'tenant', component: ChargepayRoomTenantComponent},
  {path: 'deputey', component: ChargepayRoomDeputeyComponent},
  {path: 'coupon', component: ChargepayCouponComponent},
  {path: 'owner', component: ChargepayOwnerInfoComponent},
  {path: 'roomlist', component: ChargepayRoomListComponent},
  {path: 'parklist', component: ChargepayParkspaceListComponent},
  {path: 'editPark', component: ChargepayParkspaceEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargepayRoutingModule { }
