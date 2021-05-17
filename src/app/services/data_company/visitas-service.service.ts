import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class VisitasServiceService {
  public url_serve = environment.url_serve;
  public datos_usuario: any = [];
  public token;
  public option;
  public headers: any;
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


  service_getall(datos) {
    return this.http.get(this.url_serve + '/api/visitas/getall/'+datos,this.option)
      .pipe(map(data => data));
  }


}
