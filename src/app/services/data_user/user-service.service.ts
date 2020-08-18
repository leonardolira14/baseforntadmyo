import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public headers: any;
  NewMarca$ = new EventEmitter<boolean>();
  dataMarca$ = new EventEmitter<any>();
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
    return this.http.post(this.url_serve + 'getalluser', datos)
      .pipe(map(data => data));
  }
  // funcion para agregar nueva certificacion
  ngadd(datos) {
    return this.http.post(this.url_serve + 'saveususer', datos)
      .pipe(map(data => data));
  }

  // funcion para actualizar una certificacion
  ngUpdate(datos) {
    return this.http.post(this.url_serve + 'usuarioupdate', datos)
      .pipe(map(data => data));
  }

  ngDelete(datos) {
    return this.http.post(this.url_serve + 'updatestatususer', datos)
      .pipe(map(data => data));
  }
  ngMaster(datos) {
    return this.http.post(this.url_serve + 'master', datos)
      .pipe(map(data => data));
  }
  ngUpdatePass(datos) {
    return this.http.post(this.url_serve + 'updateclave', datos)
      .pipe(map(data => data));
  }

}
