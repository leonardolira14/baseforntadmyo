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
  public token;
  public option;
  public headers: any;
  NewCertification$ = new EventEmitter<boolean>();
  Certification$ = new EventEmitter<any>();
  ListaGirosemiter$ = new EventEmitter<any>();
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
  // funcion para obtener todos los giros de una empresa
  service_getall() {
    return this.http.get(this.url_serve + '/api/giros/empresa/getall', this.option)
      .pipe(map(data => data));
  }

  // funcion para agregar nueva certificacion
  service_add(datos) {
    return this.http.post(this.url_serve + '/api/giros/empresa/add', datos,this.option)
      .pipe(map(data => data));
  }

  // funcion para obtener todos los giros registrados 
  getAllGiiro() {
    return this.http.get(this.url_serve + '/api/giros/giro')
      .pipe(map(data => data));
  }
  service_principal(id) {
    return this.http.get(this.url_serve + '/api/giros/empresa/principal/'+id, this.option)
      .pipe(map(data => data));
  }

  // funcion para actualizar una certificacion
  ngUpdateCerticate(datos,id) {
    return this.http.put(this.url_serve + '/api/giros/'+id,datos,this.option)
      .pipe(map(data => data));
  }

  ngDelete(datos) {
    return this.http.delete(this.url_serve + '/api/giros/empresa/'+datos, this.option)
      .pipe(map(data => data));
  }

  // funcion para obtener el sectior
  getallsubsector(sector) {
    return this.http.get(this.url_serve + '/api/giros/subgiro/' + sector)
      .pipe(map(data => data));
  }
  // funcion para obtener el sectior
  getrama(subsector) {
    return this.http.get(this.url_serve + '/api/giros/rama/' + subsector)
      .pipe(map(data => data));
  }
}
