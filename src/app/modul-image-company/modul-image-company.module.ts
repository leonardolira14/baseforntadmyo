import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ModulImageCompanyRoutingModule } from './modul-image-company-routing.module';
import { PageImgagenComponent } from './pages/page-imgagen/page-imgagen.component';
import { Cbuttons1Component } from './components/cbuttons1/cbuttons1.component';
import { CgraficosResumenComponent } from './components/cgraficos-resumen/cgraficos-resumen.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { Cbuttons2Component } from './components/cbuttons2/cbuttons2.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { Cbuttons2detailsComponent } from './components/cbuttons2details/cbuttons2details.component';
import { GraficosdetailsComponent } from './components/graficosdetails/graficosdetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { RecibidasComponent } from './pages/recibidas/recibidas.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TableComponent } from './components/table/table.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormatLinksPipe } from '../pipes/formatdate.pipe';
import { FormatImageUrlPipe } from '../pipes/ImageLink.pipe';
import { FormatStatusPipe  } from '../pipes/formatstatus.pipe';
@NgModule({
 
  declarations: [
    PageImgagenComponent,
    Cbuttons1Component,
    CgraficosResumenComponent,
    DetalleComponent,
    Cbuttons2Component,
    Cbuttons2detailsComponent,
    GraficosdetailsComponent,
    RecibidasComponent,
    FiltrosComponent,
    TableComponent,
    FormatLinksPipe,
    FormatImageUrlPipe,
    FormatStatusPipe
  ]
    ,
  imports: [
    NgbModule,
    CommonModule,
    ModulImageCompanyRoutingModule,
    NgApexchartsModule,
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatDatepickerModule,
  ],
   providers: [
    MatDatepickerModule
  ],
})
export class ModulImageCompanyModule { }
