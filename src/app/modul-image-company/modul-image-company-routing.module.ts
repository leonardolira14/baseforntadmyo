import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageImgagenComponent } from '../modul-image-company/pages/page-imgagen/page-imgagen.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { RecibidasComponent } from './pages/recibidas/recibidas.component';

const routes: Routes = [
  {
    path: 'resume',
    children: [
      {
        path: ':como/:tiempo',
        component: PageImgagenComponent
      },
    ],
  },
  {
    path: 'detail',
    children: [
      {
        path: ':como/:tiempo',
        component: DetalleComponent
      },
    ],
  },
  {
    path: 'recibidas',
    children: [
      {
        path: ':como',
        component: RecibidasComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulImageCompanyRoutingModule { }
