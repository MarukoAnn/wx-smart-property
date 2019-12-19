import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorRemindComponent} from './error-remind/error-remind.component';
import {LoginGuard} from './common/guard/login.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  // {path: '', redirectTo: '/mine/imagecropper', pathMatch: 'full'},
  // {path: '', redirectTo: '/registered', pathMatch: 'full'},
  {path: '', redirectTo: '/tab/mine', pathMatch: 'full'},
  {path: 'tab', canActivate: [LoginGuard], loadChildren: './tab/tab.module#TabModule'},
  {path: 'login', canActivate: [LoginGuard], component: LoginComponent},
  {path: 'registered', canActivate: [LoginGuard], loadChildren: './registered/registered.module#RegisteredModule'},
  {path: 'pay', canActivate: [LoginGuard], loadChildren: './pay/pay.module#PayModule'},
  {path: 'chargepay', canActivate: [LoginGuard], loadChildren: './chargepay/chargepay.module#ChargepayModule'},
  {path: 'mine', canActivate: [LoginGuard], loadChildren: './mine/mine.module#MineModule'},
  {path: 'error', component: ErrorRemindComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
