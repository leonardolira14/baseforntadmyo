import { Component, OnInit } from '@angular/core';
import { Serviecokie } from '../../../../library/servercokie';
import { EventsServiceService } from '../../../../services/events-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  gratis_Bolean = true;
  micro_Bolean = false;
  empresa_Bolean = false;
  costo_plan = 0;
  micro_radio = '';
  empresa_radio = '';
  nombre_plan = 'Plan Basico';
  data_company = [];
  total_pagar = [];
  constructor(
    private servicecookie: Serviecokie,
    private http_services: EventsServiceService,
    private activerouter: Router
  ) {
    this.http_services.preloadEvent$.emit(false);
    this.data_company = this.servicecookie.getCokie('data_company');
    
    this.cambio_plan(this.data_company['Plan_id']);
   }

  ngOnInit(): void {
  }

  cambio_plan(plan) {
    if (plan==='basic') {
      this.gratis_Bolean = true;
      this.micro_Bolean = false;
      this.empresa_Bolean = false;
      this.nombre_plan = 'Plan Basico';
      this.costo_plan = 0;
      this.empresa_radio = '';
      this.micro_radio = '';
      this.total_pagar = [{ IDPlan:'basic',Plan: 'basic', Costo: 0 }]; 
    }
    if (plan === 'M') {
      this.gratis_Bolean = false;
      this.micro_Bolean = true;
      this.empresa_Bolean = false;
      this.nombre_plan = 'Plan Micro Empresa';
      this.costo_plan = 200;
      this.micro_radio = '';
     
    }
    if (plan === 'E') {
      this.micro_radio = '';
      this.gratis_Bolean = false;
      this.micro_Bolean = false;
      this.empresa_Bolean = true;
      this.nombre_plan = 'Plan Empresarial';
      this.costo_plan = 1000;
      
    }
  }
  ngchange() {
    let datos;
    if (this.empresa_Bolean) {
     datos = this.empresa_radio.split('|');
    }
    if (this.micro_Bolean) {
      datos = this.micro_radio.split('|');
    }
    this.costo_plan = parseInt(datos[0]);
    console.log(datos);
    if (this.gratis_Bolean) {
      this.costo_plan = 0;
    }
}
  next() {
    let pago;
    if (this.empresa_Bolean) {
      if (this.empresa_radio==='') {
        Swal.fire('Error', 'Selecciona el modo de pago del plan  Empresarial','error');
        return;
      }
      const datos = this.empresa_radio.split('|');
      pago = { planID: datos[2], tiempo: datos[1], costo: datos[0] };
      this.costo_plan = parseInt(datos[0]);
    }
    if (this.micro_Bolean) {
      console.log(this.micro_radio);
      if (this.micro_radio === '') {
        Swal.fire('Error', 'Selecciona el modo de pago del plan Micro-empresa', 'error');
        return;
      }
      const datos = this.micro_radio.split('|');
      pago = { planID: datos[2], tiempo: datos[1], costo: datos[0] };
      this.costo_plan = parseInt(datos[0]);

    }
    if (this.gratis_Bolean) {
      console.log('gratis');
      pago = { planID: 'basic', tiempo: 'a', costo: '0' };
      this.costo_plan = 0;
    }
    localStorage.setItem('pago', JSON.stringify(pago));
    if (pago['planID'] !== 'basic') {
      this.activerouter.navigateByUrl('miplan/pago');
    }
  }
}
