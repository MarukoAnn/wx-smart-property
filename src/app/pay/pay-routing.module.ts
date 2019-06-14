import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PayWayComponent} from './pay-way/pay-way.component';
import {PaySuccessComponent} from './pay-success/pay-success.component';
import {PayDetailComponent} from './pay-detail/pay-detail.component';

const routes: Routes = [
  {path: 'sure', component: PayWayComponent},
  {path: 'success', component: PaySuccessComponent},
  {path: 'detail', component: PayDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
