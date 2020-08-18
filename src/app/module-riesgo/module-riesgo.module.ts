import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ModuleRiesgoRoutingModule } from './module-riesgo-routing.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';
import { Buttons2Component } from './components/buttons2/buttons2.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ButtonsComponent, RiesgoComponent, Buttons2Component, FiltrosComponent],
  imports: [
    CommonModule,
    ModuleRiesgoRoutingModule,
    ChartsModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class ModuleRiesgoModule { }
