import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataCompanyComponent } from './components/data-company/data-company.component';


const routes: Routes = [
  {
    path: '',
    component: DataCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCompanyRoutingModule { }
