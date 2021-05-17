import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../../../services/data_company/products-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { Lista } from '../../class/product-class';
import { environment } from '../../../../../environments/environment.prod';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  logitomarca;
  data_company = [];
  token = '';
  marcas_list = [];
  List_Marcas = new Lista();
  palabra = '';
  data_user = [];
  constructor(
    private http_services: EventsServiceService,
    private http: ProductsServiceService,
    private service_cookie: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_user = this.service_cookie.getCokie('data_user');
    this.http.NewMarca$.subscribe(data => {
      this.ngGetAll();
    });
    this.data_company = this.service_cookie.getCokie('data_company');
    this.token = this.service_cookie.getCokie('token');
   }

  ngOnInit(): void {
    this.ngGetAll();
  }
  ngGetAll() {
    this.http_services.preloadEvent$.emit(true);
    this.List_Marcas.clearlist();
    
    this.http.service_getall()
      .subscribe(data => {
        data['data'].forEach(item => {
          this.List_Marcas.additem(item);
        });
        this.marcas_list = this.List_Marcas.getLista();
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'info');
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngEdit(index) {
    
    const data = this.List_Marcas.GetMarca(index);
    this.http.dataMarca$.emit(data);
  }
  ngDelete(index) {
    
    this.http_services.preloadEvent$.emit(true);
    this.http.ngDelete(index)
    
      .subscribe(data => {
        Swal.fire('Exito','Producto Eliminado','success');
        this.ngGetAll();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'info');
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

  // funcion para buscar
  ngBuscar() {
    this.marcas_list = this.List_Marcas.busquedapalabra(this.palabra);
  }

  dameLogo(logo_) {
    
    if (logo_ === '' || logo_ === null || logo_ === undefined) {
      return '/assets/img/foto-no-disponible.jpg';
    } else {
      return this.DomSanitizer.bypassSecurityTrustUrl(logo_);
    }
  }

}
