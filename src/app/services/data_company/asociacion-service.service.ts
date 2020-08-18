import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class AsociacionServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  NewCertification$ = new EventEmitter<boolean>();
  Certification$ = new EventEmitter<any>();
  ListCertifications$ = new EventEmitter<any>();
  ListEstados$ = new EventEmitter<any>();
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
    return this.http.post(this.url_serve + 'getallcamara', datos)
      .pipe(map(data => data));
  }
  ngDelete(datos) {
    return this.http.post(this.url_serve + 'deletecamara', datos)
      .pipe(map(data => data));
  }
  ngUpdate(datos) {
    return this.http.post(this.url_serve + 'updatecamara', datos)
      .pipe(map(data => data));
  }
  ngAdd(datos) {
    return this.http.post(this.url_serve + 'savecamara', datos)
      .pipe(map(data => data));
  }

}
