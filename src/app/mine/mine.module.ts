import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineRoutingModule } from './mine-routing.module';
import { MineTenantInfoComponent } from './mine-tenant-info/mine-tenant-info.component';
import { MineChagePasswordComponent } from './mine-chage-password/mine-chage-password.component';
import { MineDeputyOwnerInfoComponent } from './mine-deputy-owner-info/mine-deputy-owner-info.component';
import { MineModifyPhoneComponent } from './mine-modify-phone/mine-modify-phone.component';
import { MinePersonalInfoComponent } from './mine-personal-info/mine-personal-info.component';
import { MineOwerPayInfoComponent } from './mine-ower-pay-info/mine-ower-pay-info.component';

@NgModule({
  declarations: [
  MineTenantInfoComponent,
  MineChagePasswordComponent,
  MineDeputyOwnerInfoComponent,
  MineModifyPhoneComponent,
  MinePersonalInfoComponent,
  MineOwerPayInfoComponent],
  imports: [
    CommonModule,
    MineRoutingModule
  ]
})
export class MineModule { }
