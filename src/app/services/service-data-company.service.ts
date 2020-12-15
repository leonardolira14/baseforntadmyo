import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Serviecokie } from '../library/servercokie';
@Injectable({
  providedIn: 'root'
})
export class ServiceDataCompanyService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private serviceCokie: Serviecokie
  ) {
    if (this.serviceCokie.getCokie('data_company')) {
      this.datos_usuario = this.serviceCokie.getCokie('data_company');
      console.log(this.datos_usuario);
      this.headers = new HttpHeaders({
        'Authorization': this.datos_usuario['token']
      });
    }
   }

  service_login(datos) {
    return this.http.post(this.url_serve + 'login', datos);
  }

  // funcion para obtener los datos de la empresa
  getperfilempresa(empresa) {
    return this.http.post(this.url_serve + 'getperfilempresa', empresa)
      .pipe(map(data => data));
  }

  // funcion para actualizar los datos de una empresa
  updateempresa(empresa) {
    return this.http.post(this.url_serve + 'updateempresa', empresa)
      .pipe(map(data => data));
  }

  // actualizar logo
  updatelogoempresa(empresa) {
    return this.http.post(this.url_serve + 'updatelogoempresa', empresa)
      .pipe(map(data => data));
  }

  // funcion para registar una empresa
  register(datos) {
    return this.http.post(this.url_serve + 'saveregister', datos)
      .pipe(map(data => data));
  }

  // activar cuenta
  activecuenta(datos) {
    return this.http.post(this.url_serve + 'activecuenta', datos)
      .pipe(map(data => data));
  }

  obtenerprecios() {
    return this.http.get('assets/json/precios.json')
      .pipe(map(data => data));
  }
}
