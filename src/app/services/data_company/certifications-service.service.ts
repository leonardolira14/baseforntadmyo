import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class CertificationsServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  NewCertification$ = new EventEmitter<boolean>();
  Certification$ = new EventEmitter<any>();
  
  constructor(
    private http: HttpClient,
    private cookie_service: Serviecokie
  ) {
    if (this.cookie_service.getCokie('data_user')) {
      this.datos_usuario = this.cookie_service.getCokie('data_user');
      this.headers = new HttpHeaders({
        'Authorization': this.datos_usuario['token']
      });
    }
  }

  service_getall(datos) {
    return this.http.post(this.url_serve + 'getallnorma', datos)
      .pipe(map(data => data));
  }

  // funcion para agregar nueva certificacion
  service_add(datos) {
    return this.http.post(this.url_serve + 'savenorma', datos)
      .pipe(map(data => data));
  }


  // funcion para actualizar una certificacion
  ngUpdateCerticate(datos) {
    return this.http.post(this.url_serve + 'updatenorma', datos)
      .pipe(map(data => data));
  }

  ngDelete(datos) {
    return this.http.post(this.url_serve + 'deletenorma', datos)
      .pipe(map(data => data));
  }

}
