import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { PagoComponent } from './pages/pago/pago.component';


const routes: Routes = [
  {
    path: '',
    component: TableComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiplanRoutingModule { }
