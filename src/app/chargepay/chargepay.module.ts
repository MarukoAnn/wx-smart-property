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


@NgModule({
  declarations: [
    ChargepayRoomInfoComponent,
    ChargepayUserInfoComponent,
    ChargepayItemDetailComponent,
    ChargepayMonthComponent],
  imports: [
    CommonModule,
    ChargepayRoutingModule,
    HeaderModule,
    FormsModule,
    LoadingModule,
    WeUiModule.forRoot(),
  ]
})
export class ChargepayModule { }
