import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargepayRoutingModule } from './chargepay-routing.module';
import { ChargepayRoomInfoComponent } from './chargepay-room-info/chargepay-room-info.component';
import { ChargepayUserInfoComponent } from './chargepay-user-info/chargepay-user-info.component';
import { ChargepayItemDetailComponent } from './chargepay-item-detail/chargepay-item-detail.component';
import { ChargepayMonthComponent } from './chargepay-month/chargepay-month.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';
import {WeUiModule} from 'ngx-weui';
import { ChargepayRoomTenantComponent } from './chargepay-room-tenant/chargepay-room-tenant.component';
import { ChargepayRoomDeputeyComponent } from './chargepay-room-deputey/chargepay-room-deputey.component';
import {ListModule} from '../common/components/list/list.module';
import { ChargepayCouponComponent } from './chargepay-coupon/chargepay-coupon.component';
import { ChargepayOwnerInfoComponent } from './chargepay-owner-info/chargepay-owner-info.component';


@NgModule({
  declarations: [
    ChargepayRoomInfoComponent,
    ChargepayUserInfoComponent,
    ChargepayItemDetailComponent,
    ChargepayMonthComponent,
    ChargepayRoomTenantComponent,
    ChargepayRoomDeputeyComponent,
    ChargepayCouponComponent,
    ChargepayOwnerInfoComponent],
  imports: [
    CommonModule,
    ChargepayRoutingModule,
    HeaderModule,
    FormsModule,
    LoadingModule,
    ListModule,
    WeUiModule.forRoot(),
  ]
})
export class ChargepayModule { }
