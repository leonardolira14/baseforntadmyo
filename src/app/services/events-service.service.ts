import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../library/servercokie';
@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  preloadEvent$ = new EventEmitter<boolean>();
  IDEmpresa$ = new EventEmitter<any>();
  periodoImagen$ = new EventEmitter<any>();
  TipoImagen$ = new EventEmitter<any>();
  Cambio_menu$ = new EventEmitter<any>();
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

  // funcion para enviar el cambio de plan

  ngchangeplan(datos) {
    return this.http.post(`${this.url_serve}updateplan`, datos)
      .pipe(map(data => data));
  }
}
