import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class MarcasServiceService {
  public url_serve = environment.url_serve;
  public token;
  public option;
  public headers: any;
  NewMarca$ = new EventEmitter<boolean>();
  dataMarca$ = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private serviceCokie: Serviecokie
  ) {
    if (this.serviceCokie.getCokie('token')) {
      this.token = this.serviceCokie.getCokie('token');
     this.option = {
        headers: new HttpHeaders().append('x-token',this.token)
     }
    }
  }

  service_getall() {
    return this.http.get(this.url_serve + '/api/marca/getall', this.option)
      .pipe(map(data => data));
  }
  // funcion para agregar nueva certificacion
  marca_add(datos) {
    return this.http.post(this.url_serve + '/api/marca', datos,this.option)
      .pipe(map(data => data));
  }

  // funcion para actualizar una certificacion
  ngUpdate(datos,id) {
    return this.http.put(this.url_serve + '/api/marca/'+id,datos,this.option)
      .pipe(map(data => data));
  }

  ngDelete(datos) {
    return this.http.delete(this.url_serve + '/api/marca/'+datos, this.option)
      .pipe(map(data => data));
  }

}
