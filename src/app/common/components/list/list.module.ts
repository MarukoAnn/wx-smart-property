import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from './list.component';
import {HeaderComponent} from '../header/header.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule
  ],
  exports: [ListComponent]
})
export class ListModule { }
