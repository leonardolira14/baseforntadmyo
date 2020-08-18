import { Component, OnInit } from '@angular/core';
import { NotificacionesServiceService } from '../../../../services/data_company/notificaciones-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  model: NgbDateStruct;
  data_empresa = [];
  token = '';
  confdata: any = {};
  data_user: [];
  constructor(
    private http_services: EventsServiceService,
    private http: NotificacionesServiceService,
    private serviceCookie: Serviecokie
  ) {
    this.data_user = this.serviceCookie.getCokie('data_user');
    this.data_empresa = this.serviceCookie.getCokie('data_company');
    this.token = this.serviceCookie.getCokie('token');
   }

  ngOnInit(): void {
    this.getall();

  }
  getall() {
    const data = { IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token };
    this.http.getConfiguracion(data)
      .subscribe(data => {
        this.confdata = JSON.parse(data['config']['Configaletas']);
        console.log(this.confdata);
      }, error => {
          console.log(error);
      });
  }
  ngChange() {
    if (this.data_user['Tipo_Usuario'] !== 'Master') {
      alert('Lo sentimos no favor de contactar al usuario master para realizar modificaciones o cambios.');
      return;
    }
    const data = { IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token, alertas: this.confdata };
    console.log(data);
    this.http.updateConfiguracion(data)
      .subscribe(data => {
        alert('alertas actualizadas');
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
}
