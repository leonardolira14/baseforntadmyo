import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsServiceService } from '../../../services/data_company/products-service.service';
import { Serviecokie } from '../../../library/servercokie';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  token = '';
  marcas_list = [];
  idEmpresa;
  constructor(
    private http_services: EventsServiceService,
    private http: ProductsServiceService,
    private service_cookie: Serviecokie,
    private rutaactiva: ActivatedRoute
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.token = this.service_cookie.getCokie('token');
    this.rutaactiva.params.subscribe(data => {
      this.idEmpresa = data['empresa'];
    });
    this.ngGetAll();
   }

  ngOnInit(): void {
  }
  ngGetAll() {
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.idEmpresa, token: this.token };
    this.http.service_getall(datos)
      .subscribe(data => {
        this.marcas_list = data['response']['result'];
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
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
