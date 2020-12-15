import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';
import { DetallesComponent } from './pages/detalles/detalles.component';



const routes: Routes = [
  {
    path: 'resume',
    children: [
      {
        path: ':como/:tiempo',
        component: RiesgoComponent
      },
    ],
  },
  {
    path: 'detalle',
    children: [
      {
        path: ':como/:tiempo',
        component: DetallesComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRiesgoRoutingModule { }
