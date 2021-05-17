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
  public token;
  public option;
  NewMarca$ = new EventEmitter<boolean>();
  dataMarca$ = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private cookie_service: Serviecokie
  ) {
    if (this.cookie_service.getCokie('token')) {
      this.token = this.cookie_service.getCokie('token');
      this.option = {
          headers: new HttpHeaders().append('x-token',this.token)
      }
    }
  }
  service_getall() {
    return this.http.get(this.url_serve + '/api/usuarios/getall', this.option)
      .pipe(map(data => data));
  }
  // funcion para agregar nueva certificacion
  ngadd(datos) {
    return this.http.post(this.url_serve + '/api/usuarios/', datos,this.option)
      .pipe(map(data => data));
  }

  // funcion para actualizar una certificacion
  ngUpdate(datos,data) {
    return this.http.put(this.url_serve + '/api/usuarios/'+datos,data,this.option)
      .pipe(map(data => data));
  }

  ngDelete(datos) {
    return this.http.delete(this.url_serve + '/api/usuarios/'+datos, this.option)
      .pipe(map(data => data));
  }
  ngMaster(datos) {
    return this.http.get(this.url_serve + '/api/usuarios/master/'+datos, this.option)
      .pipe(map(data => data));
  }
  ngUpdatePass(data) {
    console.log(data);
    return this.http.post(this.url_serve + '/api/usuarios/udpatepassword/',data, this.option)
      .pipe(map(data => data));
  }

}
