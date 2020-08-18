import { Component, OnInit } from '@angular/core';
import { Serviecokie } from '../../../library/servercokie';
import { ActivatedRoute } from '@angular/router';
import { EventsServiceService } from '../../../services/events-service.service';
@Component({
  selector: 'app-cbuttons2details',
  templateUrl: './cbuttons2details.component.html',
  styleUrls: ['./cbuttons2details.component.scss']
})
export class Cbuttons2detailsComponent implements OnInit {
  como: string;
  tiempo: string;
  contrario: string;
  activo_mes = false;
  activo_mes_MA = true;
  activo_mes_anio = false;
  fecha = new Date();
  text = this.fecha.getDay() + ' ' + this.fecha.getFullYear();
  data_company: [];
  token = '';
  periodo = '';
  constructor(
    private http_services: EventsServiceService,
    private rutaActiva: ActivatedRoute,
    private cookieservices: Serviecokie
  ) {
    this.token = this.cookieservices.getCokie('token');
    this.data_company = this.cookieservices.getCokie('data_company');
    this.rutaActiva.params.subscribe(data => {

      this.como = data['como'];
      this.tiempo = data['tiempo'];
      this.ngOnInit();
    });
   }

  ngOnInit(): void {
    const array = [
      {
        como: this.como,
        tiempo: this.tiempo,
        IDEmpresa: this.data_company['IDEmpresa']
      }
    ];
    //this.http_services.IDEmpresa$.emit(array);
    // tslint:disable-next-line: no-unused-expression
    if (this.como === 'cliente') {
      this.contrario = 'proveedores';
    } else {
      this.contrario = 'clientes';
    }
    if (this.tiempo === 'M') {
      this.activo_mes = true;
      this.activo_mes_MA = false;
      this.activo_mes_anio = false;
    } else if (this.tiempo === 'MA') {
      this.activo_mes = false;
      this.activo_mes_MA = true;
      this.activo_mes_anio = false;
    } else {
      this.activo_mes = false;
      this.activo_mes_MA = false;
      this.activo_mes_anio = true;
    }

  }

}
