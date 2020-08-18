import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CassociationsComponent } from './componets/cassociations/cassociations.component';


const routes: Routes = [
  {
    path: '',
    component: CassociationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationsRoutingModule { }
