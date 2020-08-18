import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../../../services/data_company/products-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { Lista } from '../../class/product-class';
import { environment } from '../../../../../environments/environment.prod';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
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
    private service_cookie: Serviecokie
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
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token };
    this.http.service_getall(datos)
      .subscribe(data => {
        data['response']['result'].forEach(item => {
          this.List_Marcas.additem(item);
        });
        this.marcas_list = this.List_Marcas.getLista();
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngEdit(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const data = this.List_Marcas.GetMarca(index);
    this.http.dataMarca$.emit(data);
  }
  ngDelete(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token, IDProducto: index };
    this.http.ngDelete(datos)
      .subscribe(data => {
        alert('Producto Eliminado');
        this.ngGetAll();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

  // funcion para buscar
  ngBuscar() {
    this.marcas_list = this.List_Marcas.busquedapalabra(this.palabra);
  }

  dameLogo(logo_) {
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logoprod/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      return base_logo;
    } else {
      return logo;
    }
  }

}
