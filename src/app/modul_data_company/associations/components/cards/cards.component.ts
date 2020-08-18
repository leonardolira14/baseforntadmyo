import { Component, OnInit } from '@angular/core';
import { AsociacionServiceService } from '../../../../services/data_company/asociacion-service.service';
import { ListaClass } from '../../class/List-class';
import { environment } from '../../../../../environments/environment';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../../library/servercokie';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  data_company = [];
  data_user = [];
  token = '';
  List_asociaciones = new ListaClass();
  Lista_asociaciones = [];
  url_server = environment.url_serve;
  palabra = '';
  constructor(
    private http_services: EventsServiceService,
    private http: AsociacionServiceService,
    private service_cookie: Serviecokie
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_company = this.service_cookie.getCokie('data_company');
    this.data_user = this.service_cookie.getCokie('data_user');
    this.token = this.service_cookie.getCokie('token');
    this.http.NewCertification$.subscribe(data => {
      this.nggetall();
    });
  }

  ngOnInit(): void {
    this.nggetall();
  }
  nggetall() {
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token };
    this.http.service_getall(datos)
      .subscribe(data => {
        this.List_asociaciones.clearlist();
        const listas = { Estados: data['response']['estados'], Certificados: data['response']['data'] };
        console.log(listas);
        this.http.ListCertifications$.emit(listas);
        data['response']['result'].forEach(element => {
          this.List_asociaciones.additem(element);
        });
        this.Lista_asociaciones = this.List_asociaciones.getLista();
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
          this.http_services.preloadEvent$.emit(false);
      });
  }
  buscar() {
    this.Lista_asociaciones = this.List_asociaciones.busquedapalabra(this.palabra);
  }
  delete(index) {
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token, IDAsocia: index };
    this.http_services.preloadEvent$.emit(true);
    this.http.ngDelete(datos)
      .subscribe(data => {
        alert('Asociacion Eliminada');
        this.nggetall();
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
        this.http_services.preloadEvent$.emit(false);
      });
  }
  ngEdit(index) {
    const datos = this.List_asociaciones.GetMarca(index);
    this.http.Certification$.emit(datos);
  }
}
