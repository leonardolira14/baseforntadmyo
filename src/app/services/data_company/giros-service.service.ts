import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';
@Injectable({
  providedIn: 'root'
})
export class GirosServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  NewCertification$ = new EventEmitter<boolean>();
  Certification$ = new EventEmitter<any>();
  ListaGirosemiter$ = new EventEmitter<any>();
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
  // funcion para obtener todos los giros
  service_getall(datos) {
    return this.http.post(this.url_serve + 'getallgiro', datos)
      .pipe(map(data => data));
  }

  // funcion para agregar nueva certificacion
  service_add(datos) {
    return this.http.post(this.url_serve + 'reggiro', datos)
      .pipe(map(data => data));
  }
  service_principal(datos) {
    return this.http.post(this.url_serve + 'principal', datos)
      .pipe(map(data => data));
  }

  // funcion para actualizar una certificacion
  ngUpdateCerticate(datos) {
    return this.http.post(this.url_serve + 'updategiro', datos)
      .pipe(map(data => data));
  }

  ngDelete(datos) {
    return this.http.post(this.url_serve + 'deletegiro', datos)
      .pipe(map(data => data));
  }

  // funcion para obtener el sectior
  getallsubsector(sector) {
    return this.http.get(this.url_serve + 'getallsubsector?sector=' + sector)
      .pipe(map(data => data));
  }
  // funcion para obtener el sectior
  getrama(subsector) {
    return this.http.get(this.url_serve + 'getallrama?subsector=' + subsector)
      .pipe(map(data => data));
  }
}
