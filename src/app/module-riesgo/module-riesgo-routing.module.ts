import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRiesgoRoutingModule { }
