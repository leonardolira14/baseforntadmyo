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
  public token;
  public option;
  public headers: any;
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private serviceCokie: Serviecokie
  ) {
    if (this.serviceCokie.getCokie('token')) {
     this.token = this.serviceCokie.getCokie('token');
     this.option = {
        headers: new HttpHeaders().append('x-token',this.token)
     }
    }
   }
  
  service_login(datos) {
    return this.http.post(this.url_serve + '/api/auth/login', datos);
  }
  getdatacompany(){
    console.log(this.option);
    return this.http.get(this.url_serve + '/api/company/getdata',this.option);
    
  }

  // funcion para obtener los datos de la empresa
  getperfilempresa(empresa) {
    return this.http.post(this.url_serve + 'getperfilempresa', empresa)
      .pipe(map(data => data));
  }

  // funcion para actualizar los datos de una empresa
  updateempresa(empresa) {
    return this.http.put(this.url_serve + '/api/company/updatedate', empresa,this.option)
      .pipe(map(data => data));
  }

  // actualizar logo
  updatelogoempresa(empresa) {
    return this.http.put(this.url_serve + '/api/company/updatelogo', empresa,this.option)
      .pipe(map(data => data));
  }

  // funcion para registar una empresa
  register(datos) {
   
    return this.http.post(this.url_serve + '/api/company/add', datos,this.option)
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
  recuperar(data){
    return this.http.post(this.url_serve + '/api/auth/recupera', data)
    .pipe(map(data => data));
  }
}
