import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisRoutingModule } from './analisis-routing.module';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaimgComponent } from './components/mapaimg/mapaimg.component';


@NgModule({
  declarations: [MapaComponent, MapaimgComponent],
  imports: [
    CommonModule,
    AnalisisRoutingModule
  ]
})
export class AnalisisModule { }
