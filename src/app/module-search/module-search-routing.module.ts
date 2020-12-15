import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PcertificacionesComponent } from './pages/perfilB/pcertificaciones/pcertificaciones.component';
import { PproductosComponent } from './pages/perfilB/pproductos/pproductos.component';
import { PmarcasComponent } from './pages/perfilB/pmarcas/pmarcas.component';
import { PasociacionesComponent } from './pages/perfilB/pasociaciones/pasociaciones.component';
import { PusuariosComponent } from './pages/perfilB/pusuarios/pusuarios.component';
import { PimagenComponent } from './pages/perfilB/pimagen/pimagen.component';


const routes: Routes = [
  {
    path: 'search',
    children: [
      {
        path: ':palabra',
        component: SearchComponent
      },
    ],
  },
  {
    path: 'perfil',
    children: [
      {
        path: ':empresa/:periodo',
        component: PerfilComponent
      },
    ],
  },
  {
    path: 'certificaciones',
    children: [
      {
        path: ':empresa',
        component: PcertificacionesComponent
      },
    ],
  },
  {
    path: 'productos',
    children: [
      {
        path: ':empresa',
        component: PproductosComponent
      },
    ],
  },
  {
    path: 'marcas',
    children: [
      {
        path: ':empresa',
        component: PmarcasComponent
      },
    ],
  },
  {
    path: 'asociaciones',
    children: [
      {
        path: ':empresa',
        component: PasociacionesComponent
      },
    ],
  },
  {
    path: 'usuarios',
    children: [
      {
        path: ':empresa',
        component: PusuariosComponent
      },
    ],
  },
  {
    path: 'imagen',
    children: [
      {
        path: ':empresa/:como/:tiempo',
        component: PimagenComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSearchRoutingModule { }
