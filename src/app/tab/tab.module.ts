import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import {TabRoutingModule} from './tab-routing.module';
import {InfiniteLoaderModule, WeUiModule} from 'ngx-weui';
import { TabMineComponent } from './tab-mine/tab-mine.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';
import { TabHomeComponent } from './tab-home/tab-home.component';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  observer: true,
  threshold: 50,
  spaceBetween: 5,
  centeredSlides: true
};
@NgModule({
  declarations: [
    TabComponent,
    TabMineComponent,
    TabHomeComponent
  ],
  imports: [
    CommonModule,
    WeUiModule.forRoot(),
    TabRoutingModule,
    HeaderModule,
    FormsModule,
    LoadingModule,
    SwiperModule,
    InfiniteLoaderModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class TabModule { }
