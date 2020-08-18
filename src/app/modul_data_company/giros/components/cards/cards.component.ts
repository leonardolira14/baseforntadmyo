import { Component, OnInit } from '@angular/core';
import { GirosServiceService } from '../../../../services/data_company/giros-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { ListaClass } from '../../class/list-giros';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  data_company = [];
  token = '';
  giros_empresa = [];
  ListaGiros = new ListaClass();
  palabra = '';
  data_user: [];
  constructor(
    private http_services: EventsServiceService,
    private http: GirosServiceService,
    private serviceCookie: Serviecokie
  ) {
    this.http.NewCertification$.subscribe(data => {
      this.ngGetList();
    });
    this.token = this.serviceCookie.getCokie('token');
    this.data_company = this.serviceCookie.getCokie('data_company');
    this.data_user = this.serviceCookie.getCokie('data_user');
   }

  ngOnInit(): void {
    this.ngGetList();
  }
  ngGetList() {
    this.http_services.preloadEvent$.emit(true);
    this.ListaGiros.clearlist();
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token };
    this.http.service_getall(datos)
      .subscribe(data => {
       
        data['giros'].forEach(item => {
          this.ListaGiros.additem(item);
        });
        this.giros_empresa = this.ListaGiros.getLista();
        this.http.ListaGirosemiter$.emit(data['allgiros']);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      },  () => this.http_services.preloadEvent$.emit(false));
  }
  ngEditar(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const datos = this.ListaGiros.GetCertification(index);
    this.http.Certification$.emit(datos);
  }
  ngDelete(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token, IDGiro: index };
    this.http.ngDelete(datos)
      .subscribe(data => {
        alert('Giro Eliminado');
        this.ngGetList();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

  buscar() {
    this.giros_empresa = this.ListaGiros.busquedapalabra(this.palabra);
  }

  // hacer Principal
  ngPricipal(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http.NewCertification$.emit(true);
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token, IDGiro: index };
    this.http.service_principal(datos)
      .subscribe(data => {
        alert('Giro actualizado');
        this.ngGetList();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

}
