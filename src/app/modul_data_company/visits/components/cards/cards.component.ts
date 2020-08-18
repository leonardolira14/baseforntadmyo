import { Component, OnInit } from '@angular/core';
import { NotificacionesServiceService } from '../../../../services/data_company/notificaciones-service.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationClass } from '../../class/notifications-class';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  data_empresa = [];
  token = '';
  data_user: [];
  Lista_Notificaciones = new NotificationClass();
  lista_notificacion = [];
  TipoNotificacion;
  Fecha: NgbDate;
  public tipo_notificacion = [
    { Nombre: 'Calificaciones Recibidas', Value: 'crecibidas' },
    { Nombre: 'Calificación Realizada', Value: 'crealizadas' },
    { Nombre: 'Visita Recibida', Value: 'vista' },
    { Nombre: 'Riesgo de Cliente', Value: 'riesgoc' },
    { Nombre: 'Riesgo de Proveedor', Value: 'riesgop' },
    { Nombre: 'Seguimiento de empresas', Value: 'follow' },
    { Nombre: 'Todas', Value: '' },
  ];
  constructor(
    private http_services: EventsServiceService,
    private http: NotificacionesServiceService,
    private serviceCookie: CookieService
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_user = JSON.parse(this.serviceCookie.get('data_user'));
    this.data_empresa = JSON.parse(this.serviceCookie.get('data_company'));
    this.token = this.serviceCookie.get('token');
  }

  ngOnInit(): void {
    this.getall();
  }
  getall() {
    this.http_services.preloadEvent$.emit(true);
    const data = { IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token };
    this.http.service_getall(data)
      .subscribe(data => {
        this.Lista_Notificaciones.clearlist();
        data['notificaciones'].forEach(item => {
          this.Lista_Notificaciones.additem(item);
        });
        this.lista_notificacion = this.Lista_Notificaciones.getLista();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngEdit(index) {

  }
  ngDelete(index) {
    if (this.data_user['Tipo_Usuario'] !== 'Master') {
      alert('Lo sentimos no favor de contactar al usuario master para realizar modificaciones o cambios.');
      return;
    }
    const data = { IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token, IDNotificacion: index };
    this.http_services.preloadEvent$.emit(true);
    this.http.delete(data)
      .subscribe(data => {
        this.getall();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  aplicarfiltro() {
    console.log(this.Fecha);
    let  datev;
    if (this.Fecha === undefined) {
      datev = '';
    } else {
      datev = this.Fecha.year + '-' + this.Fecha.month + '-' + this.Fecha.day;
    }
    const data = { IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token, Fecha: datev, Filtro: this.TipoNotificacion };
    this.http_services.preloadEvent$.emit(true);
    this.http.ngfiltro(data)
      .subscribe(data => {
        this.Lista_Notificaciones.clearlist();
        data['notificaciones'].forEach(item => {
          this.Lista_Notificaciones.additem(item);
        });
        this.lista_notificacion = this.Lista_Notificaciones.getLista();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  limpiaraplicarfiltro() {
  }
}
