import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChomeComponent } from './components/chome/chome.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ValidarComponent } from './pages/validar/validar.component';

const routes: Routes = [
  {
    path: '',
    component: ChomeComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'validar',
    children: [{
      path: ':token',
      component: ValidarComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
