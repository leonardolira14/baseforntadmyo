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
  public datos_usuario: any = [];
  public headers: any;
  FormCuestionario$ = new EventEmitter<any>();
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

  // funcion para obtener las empresas

  ngGetdata() {
    return this.http.get(this.url_serve + 'gedataqualify')
      .pipe(map(data => data));
  }

  ngGetDataQualify(datos) {
    return this.http.post(this.url_serve + 'gedataqualifyC', datos)
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
    return this.http.post(this.url_serve + 'getcuestionario', datos)
      .pipe(map(data => data));
  }

  // funcion para califacar una empresa
  ngcalifcar(datos) {
    return this.http.post(this.url_serve + 'calificar', datos)
      .pipe(map(data => data));
  }
}
