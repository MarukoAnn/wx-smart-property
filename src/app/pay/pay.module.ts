import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PayWayComponent } from './pay-way/pay-way.component';
import { PayDetailComponent } from './pay-detail/pay-detail.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';
import {DialogModule, WeUiModule} from 'ngx-weui';
import {DialogPayModule} from '../common/components/dialog-pay/dialog-pay.module';

@NgModule({
  declarations: [
    PaySuccessComponent,
    PayWayComponent,
    PayDetailComponent
  ],
  imports: [
    CommonModule,
    PayRoutingModule,
    HeaderModule,
    FormsModule,
    LoadingModule,
    WeUiModule.forRoot(),
    DialogPayModule,
  ]
})
export class PayModule { }
