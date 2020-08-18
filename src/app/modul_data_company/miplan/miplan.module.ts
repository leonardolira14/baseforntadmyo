import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MiplanRoutingModule } from './miplan-routing.module';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MiplanRoutingModule,
    FormsModule
  ]
})
export class MiplanModule { }
