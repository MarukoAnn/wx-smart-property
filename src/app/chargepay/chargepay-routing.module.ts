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

const routes: Routes = [
  {path: 'itemdetail', component: ChargepayItemDetailComponent},
  {path: 'month', component: ChargepayMonthComponent},
  {path: 'userinfo', component: ChargepayUserInfoComponent},
  {path: 'roominfo', component: ChargepayRoomInfoComponent},
  {path: 'tenant', component: ChargepayRoomTenantComponent},
  {path: 'deputey', component: ChargepayRoomDeputeyComponent},
  {path: 'coupon', component: ChargepayCouponComponent},
  {path: 'owner', component: ChargepayOwnerInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargepayRoutingModule { }
