import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class QualifyServicesService {
  public url_serve = environment.url_serve;
  public token;
  public option;
  public headers: any;
  FormCuestionario$ = new EventEmitter<any>();
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

  // funcion para obtener las empresas

  ngGetdata() {
    return this.http.get(this.url_serve + '/api/calificaciones/getdataForm',this.option)
      .pipe(map(data => data));
  }

  ngGetDataQualify(datos) {
    return this.http.get(this.url_serve + '/api/calificaciones/getdataCompany/'+datos, this.option)
      .pipe(map(data => data));
  }
  getsubsector(sector) {

    return this.http.get(this.url_serve + 'getallsubsector?sector=' + sector)
      .pipe(map(data => data));
  }
  getrama(subsector) {
    return this.http.get(this.url_serve + 'getallrama?subsector=' + subsector)
      .pipe(map(data => data));
  }

  // function para obtener el cuestionario
  ngGetCuestionario(datos) {
    return this.http.post(this.url_serve + '/api/calificaciones/getcuestionario', datos,this.option)
      .pipe(map(data => data));
  }

  // funcion para califacar una empresa
  ngcalifcar(datos) {
    return this.http.post(this.url_serve + '/api/calificaciones/add', datos,this.option)
      .pipe(map(data => data));
  }
}
