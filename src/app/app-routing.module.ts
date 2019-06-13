import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorRemindComponent} from './error-remind/error-remind.component';
import {LoginGuard} from './common/guard/login.guard';

const routes: Routes = [
  {path: '', redirectTo: '/registered', pathMatch: 'full'},
  {path: 'tab', canActivate: [LoginGuard], loadChildren: './tab/tab.module#TabModule'},
  {path: 'registered', canActivate: [LoginGuard], loadChildren: './registered/registered.module#RegisteredModule'},
  {path: 'error', component: ErrorRemindComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
