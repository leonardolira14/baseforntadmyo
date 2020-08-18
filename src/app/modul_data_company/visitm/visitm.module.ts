import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitmRoutingModule } from './visitm-routing.module';
import { GraphicsComponent } from './component/graphics/graphics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [GraphicsComponent],
  imports: [
    CommonModule,
    VisitmRoutingModule,
    NgApexchartsModule,
    ChartsModule
  ]
})
export class VisitmModule { }
