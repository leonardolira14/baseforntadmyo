import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { CertificacionesComponent } from './pages/certificaciones/certificaciones.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { FollowComponent } from './pages/follow/follow.component';


const routes: Routes = [
  {
    path: 'resume',
    children: [
      {
        path: ':tiempo',
        component: ResumenComponent
      },
    ],
  },
  {
    path: 'certification',
    component: CertificacionesComponent
  },
  {
    path: 'marcas',
    component: MarcaComponent
  },
  {
    path: 'follow',
    component: FollowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
