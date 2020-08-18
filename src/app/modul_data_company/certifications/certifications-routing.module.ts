import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcertificationsComponent } from './components/ccertifications/ccertifications.component';


const routes: Routes = [
  {
    path: '',
    component: CcertificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificationsRoutingModule { }
