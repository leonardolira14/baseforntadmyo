import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  NewNotification$ = new EventEmitter<boolean>();
  dataNotification$ = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private cookie_service: Serviecokie
  ) {
    if (this.cookie_service.getCokie('data_user')) {
      this.datos_usuario = JSON.parse(this.cookie_service.getCokie('data_user'));
      this.headers = new HttpHeaders({
        'Authorization': this.datos_usuario['token']
      });
    }
  }
  service_getall(datos) {
    return this.http.post(this.url_serve + 'getallnotification', datos)
      .pipe(map(data => data));
  }
  ngfiltro(datos) {
    
    return this.http.post(this.url_serve + 'notificationfiltro', datos)
      .pipe(map(data => data));
  }
  getConfiguracion(datos) {
    return this.http.post(this.url_serve + 'getconfignotification', datos)
      .pipe(map(data => data));
  }
  updateConfiguracion(datos) {
    return this.http.post(this.url_serve + 'updateconfignotification', datos)
      .pipe(map(data => data));
  }
  delete(datos) {
    return this.http.post(this.url_serve + 'deletegnotification', datos)
      .pipe(map(data => data));
  }
}
