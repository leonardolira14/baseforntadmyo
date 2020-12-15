import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MiplanRoutingModule } from './miplan-routing.module';
import { TableComponent } from './components/table/table.component';
import { PagoComponent } from './pages/pago/pago.component';


@NgModule({
  declarations: [TableComponent, PagoComponent],
  imports: [
    CommonModule,
    MiplanRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MiplanModule { }
