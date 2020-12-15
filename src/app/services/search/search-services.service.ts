import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';
@Injectable({
  providedIn: 'root'
})
export class SearchServicesService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  ListaResultados$ = new EventEmitter<any>();
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
  nueva_busqueda(datos) {
    return this.http.post(this.url_serve + 'busquedas', datos)
      .pipe(map(data => data));
  }
  ngObtenerEstados() {
    return this.http.get(this.url_serve + 'getestados')
      .pipe(map(data => data));
  }
  // funcion para obtener los datos de una empresa buscada
  ngDataPerfilDatos(datos) {
    return this.http.post(this.url_serve + 'perfilBus', datos)
      .pipe(map(data => data));
  }
  // funcion para seguir una empresa
  ngFollow(datos) {
    return this.http.post(this.url_serve + 'addfollow', datos)
      .pipe(map(data => data));
  }
  // funcion para traer los datos del perfil
  ngDataPerfil(datos) {
    return this.http.post(this.url_serve + 'perfildata', datos)
      .pipe(map(data => data));
  }

}
