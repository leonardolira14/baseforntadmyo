import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChomeComponent } from './components/chome/chome.component';


const routes: Routes = [
  {
    path: '',
    component: ChomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
