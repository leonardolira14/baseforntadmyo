import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';
@Injectable({
  providedIn: 'root'
})
export class ImgenServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  ListCalificaciones$ = new EventEmitter<any>();
  Filtros$ = new EventEmitter<any>();
  NewListado$ = new EventEmitter<any>();
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

  // funcion para obtener la imagen de una empresa
  ngGetImagen(datos) {
    return this.http.post(this.url_serve + 'getimagen', datos)
      .pipe(map(data => data));
  }

  // funcion para obtener los detalles de imagen
  ngDetalles(datos) {
    return this.http.post(this.url_serve + 'detallesimagen', datos)
      .pipe(map(data => data));
  }

  // funcion para obtener las calificaciones rebidas
  ngGetCalif(datos) {
    return this.http.post(this.url_serve + 'getallrecibidas', datos)
      .pipe(map(data => data));
  }

  // funcion para obtener los detalles de preguntas
  ngDetalle(datos) {
    return this.http.post(this.url_serve + 'detallescalificacion', datos)
      .pipe(map(data => data));
  }

  // funcion para cambiar el status de la valoracion
  ngChangeValora(datos) {
    return this.http.post(this.url_serve + 'pendientevaloracion', datos)
      .pipe(map(data => data));
  }
}
