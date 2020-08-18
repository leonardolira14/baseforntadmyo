import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualifyComponent } from './pages/qualify/qualify.component';


const routes: Routes = [
  {
    path: 'score',
    children: [
      {
        path: ':como',
        component: QualifyComponent
      },
    ],
  },
  {
    path: 'rate',
    children: [
      {
        path: ':valora',
        component: QualifyComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleQualifyRoutingModule { }
