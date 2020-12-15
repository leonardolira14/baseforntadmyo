import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ModuleRiesgoRoutingModule } from './module-riesgo-routing.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';
import { Buttons2Component } from './components/buttons2/buttons2.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetallesComponent } from './pages/detalles/detalles.component';
import { FiltrosdetallesComponent } from './components/filtrosdetalles/filtrosdetalles.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { Buttons2detailComponent } from './components/buttons2detail/buttons2detail.component';
@NgModule({
  declarations: [ButtonsComponent, RiesgoComponent, Buttons2Component, FiltrosComponent, DetallesComponent, FiltrosdetallesComponent, Buttons2detailComponent],
  imports: [
    CommonModule,
    ModuleRiesgoRoutingModule,
    ChartsModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class ModuleRiesgoModule { }
