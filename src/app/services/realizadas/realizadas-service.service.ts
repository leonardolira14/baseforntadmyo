import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class RealizadasServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  Listacalificaciones$ = new EventEmitter<any>();
  ListaClientes$ = new EventEmitter<any>();
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
  // funcion para obtener las calificaciones

  ngGetdata(datos) {
    return this.http.post(this.url_serve + 'getallrealizadas', datos)
      .pipe(map(data => data));
  }
  // funcion para obtener los detalles de preguntas
  ngDetalle(datos) {
    return this.http.post(this.url_serve + 'detallescalificacion', datos)
      .pipe(map(data => data));
  }
  // funcion para obtener la lista de los clientes
  ngListaClientes(datos) {
    return this.http.post(this.url_serve + 'getlista', datos)
      .pipe(map(data => data));
  }
  // funcion para tener filtrados los clientes
  ngFilterclie(datos) {
    return this.http.post(this.url_serve + 'filterclientes', datos)
      .pipe(map(data => data));
  }


}
