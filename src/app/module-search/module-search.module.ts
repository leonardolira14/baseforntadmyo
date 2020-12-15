import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSearchRoutingModule } from './module-search-routing.module';
import { SearchComponent } from './pages/search/search.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { CardComponent } from './components/card/card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DataperfilComponent } from './components/dataperfil/dataperfil.component';
import { PerfilheaderComponent } from './components/perfilheader/perfilheader.component';
import { PerfilmenuComponent } from './components/perfilmenu/perfilmenu.component';
import { ResumenComponent } from './componentsperfil/resumen/resumen.component';
import { CertificacionesComponent } from './componentsperfil/certificaciones/certificaciones.component';
import { ProductosComponent } from './componentsperfil/productos/productos.component';
import { MarcasComponent } from './componentsperfil/marcas/marcas.component';
import { AsociacionesComponent } from './componentsperfil/asociaciones/asociaciones.component';
import { UsuariosComponent } from './componentsperfil/usuarios/usuarios.component';
import { ImagenComponent } from './componentsperfil/imagen/imagen.component';
import { PcertificacionesComponent } from './pages/perfilB/pcertificaciones/pcertificaciones.component';
import { PproductosComponent } from './pages/perfilB/pproductos/pproductos.component';
import { BotonessupComponent } from './components/botonessup/botonessup.component';
import { PmarcasComponent } from './pages/perfilB/pmarcas/pmarcas.component';
import { PasociacionesComponent } from './pages/perfilB/pasociaciones/pasociaciones.component';
import { PusuariosComponent } from './pages/perfilB/pusuarios/pusuarios.component';
import { PimagenComponent } from './pages/perfilB/pimagen/pimagen.component'; 
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModulepipeModule } from '../pipes/modulepipe/modulepipe.module';
@NgModule({
  declarations: [SearchComponent, FiltrosComponent, CardComponent, PerfilComponent, DataperfilComponent, PerfilheaderComponent, PerfilmenuComponent, ResumenComponent, CertificacionesComponent, ProductosComponent, MarcasComponent, AsociacionesComponent, UsuariosComponent, ImagenComponent, PcertificacionesComponent, PproductosComponent, BotonessupComponent, PmarcasComponent, PasociacionesComponent, PusuariosComponent, PimagenComponent],
  imports: [
    CommonModule,
    ModuleSearchRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    MatExpansionModule,
    NgApexchartsModule,
    ChartsModule,
    MatDatepickerModule,
    ModulepipeModule
  ]
})
export class ModuleSearchModule { }
