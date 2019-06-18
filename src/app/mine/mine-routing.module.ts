import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MineOwerPayInfoComponent} from './mine-ower-pay-info/mine-ower-pay-info.component';
import {MineChangePasswordComponent} from './mine-change-password/mine-change-password.component';
import {MineModifyPhoneComponent} from './mine-modify-phone/mine-modify-phone.component';
import {MineDeputyOwerInfoComponent} from './mine-deputy-ower-info/mine-deputy-ower-info.component';
import {MineTenantInfoComponent} from './mine-tenant-info/mine-tenant-info.component';
import {MinePersonalInfoComponent} from './mine-personal-info/mine-personal-info.component';
import {MinePersionChangePhoneComponent} from './mine-personal-info/mine-persion-change-phone/mine-persion-change-phone.component';
import {MinePersionChangeUsernameComponent} from './mine-personal-info/mine-persion-change-username/mine-persion-change-username.component';
import {MineDeputyChangeInfoComponent} from './mine-deputy-ower-info/mine-deputy-change-info/mine-deputy-change-info.component';
import {MineDeputyDetailComponent} from './mine-deputy-ower-info/mine-deputy-detail/mine-deputy-detail.component';
import {MineDeputyAddComponent} from './mine-deputy-ower-info/mine-deputy-add/mine-deputy-add.component';

const routes: Routes = [
  {path: 'owerinfo', component: MineOwerPayInfoComponent},
  {path: 'changepsw', component: MineChangePasswordComponent},
  {path: 'modifyphone', component: MineModifyPhoneComponent},
  {path: 'deputyinfo', component: MineDeputyOwerInfoComponent},
  {path: 'tenantinfo', component: MineTenantInfoComponent},
  {path: 'persioninfo', component: MinePersonalInfoComponent},
  {path: 'payinfo', component: MineOwerPayInfoComponent},
  {path: 'changephone', component: MinePersionChangePhoneComponent},
  {path: 'changeusername', component: MinePersionChangeUsernameComponent},
  {path: 'changedeputy', component: MineDeputyChangeInfoComponent},
  {path: 'deputyDetail', component: MineDeputyDetailComponent},
  {path: 'deputyadd', component: MineDeputyAddComponent},
  // {path: 'deputyadd', component: MineDeputyAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MineRoutingModule { }
