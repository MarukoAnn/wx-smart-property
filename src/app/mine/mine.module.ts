import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';

import { MineRoutingModule } from './mine-routing.module';
import { MineTenantInfoComponent } from './mine-tenant-info/mine-tenant-info.component';
import { MineChangePasswordComponent } from './mine-change-password/mine-change-password.component';
import { MineDeputyOwerInfoComponent } from './mine-deputy-ower-info/mine-deputy-ower-info.component';
import { MineModifyPhoneComponent } from './mine-modify-phone/mine-modify-phone.component';
import { MinePersonalInfoComponent } from './mine-personal-info/mine-personal-info.component';
import { MineOwerPayInfoComponent } from './mine-ower-pay-info/mine-ower-pay-info.component';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import { MinePersionChangePhoneComponent } from './mine-personal-info/mine-persion-change-phone/mine-persion-change-phone.component';
import { MinePersionChangeUsernameComponent } from './mine-personal-info/mine-persion-change-username/mine-persion-change-username.component';
import { MineDeputyChangeInfoComponent } from './mine-deputy-ower-info/mine-deputy-change-info/mine-deputy-change-info.component';
import { MineDeputyDetailComponent } from './mine-deputy-ower-info/mine-deputy-detail/mine-deputy-detail.component';
import { MineDeputyAddComponent } from './mine-deputy-ower-info/mine-deputy-add/mine-deputy-add.component';
import { MineTenantDetailComponent } from './mine-tenant-info/mine-tenant-detail/mine-tenant-detail.component';
import { MineTenantModifyComponent } from './mine-tenant-info/mine-tenant-modify/mine-tenant-modify.component';
import { MineTenantAddComponent } from './mine-tenant-info/mine-tenant-add/mine-tenant-add.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { MineImageCropperComponent } from './mine-personal-info/mine-image-cropper/mine-image-cropper.component';
import {QRCodeModule} from 'angularx-qrcode';
import {LoadingModule} from '../common/components/loading/loading.module';

@NgModule({
  declarations: [
  MineTenantInfoComponent,
  MineChangePasswordComponent,
  MineDeputyOwerInfoComponent,
  MineModifyPhoneComponent,
  MinePersonalInfoComponent,
  MineOwerPayInfoComponent,
  MinePersionChangePhoneComponent,
  MinePersionChangeUsernameComponent,
  MineDeputyChangeInfoComponent,
  MineDeputyDetailComponent,
  MineDeputyAddComponent,
  MineTenantDetailComponent,
  MineTenantModifyComponent,
  MineTenantAddComponent,
  MineImageCropperComponent],
  imports: [
    CommonModule,
    MineRoutingModule,
    HeaderModule,
    FormsModule,
    WeUiModule.forRoot(),
    ImageCropperModule,
    QRCodeModule,
    LoadingModule,
    // JWeiXinModule,
  ],
  providers: [DatePipe]
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MineModule { }
