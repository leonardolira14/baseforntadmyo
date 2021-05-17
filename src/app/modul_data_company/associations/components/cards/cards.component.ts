import { Component, OnInit } from '@angular/core';
import { AsociacionServiceService } from '../../../../services/data_company/asociacion-service.service';
import { ListaClass } from '../../class/List-class';
import { environment } from '../../../../../environments/environment';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../../library/servercokie';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
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
    private service_cookie: Serviecokie,
    private DomSanitizer : DomSanitizer
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
    
    
    this.http.service_getall()
      .subscribe(data => {
        console.log(data);
        this.List_asociaciones.clearlist();
        
       
        //this.http.ListCertifications$.emit(listas);
        data['data'].forEach(element => {
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
  dameLogo(logo_) {
    
    if (logo_ === '' || logo_ === null || logo_ === undefined) {
      return '/assets/img/foto-no-disponible.jpg';
    } else {
      return this.DomSanitizer.bypassSecurityTrustUrl(logo_);
    }
  }
  delete(index) {
    this.http_services.preloadEvent$.emit(true);
    this.http.ngDelete(index)
      .subscribe(data => {
        Swal.fire('Exito','Asociacion Eliminada','success');
        this.nggetall();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'error');
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
