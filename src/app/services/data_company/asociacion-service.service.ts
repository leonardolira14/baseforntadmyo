import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Serviecokie } from '../../library/servercokie';

@Injectable({
  providedIn: 'root'
})
export class AsociacionServiceService {
  public url_serve = environment.url_serve;
  public token;
  public option;
  public headers: any;
  NewCertification$ = new EventEmitter<boolean>();
  Certification$ = new EventEmitter<any>();
  ListCertifications$ = new EventEmitter<any>();
  ListEstados$ = new EventEmitter<any>();
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
    return this.http.get(this.url_serve + '/api/asociacion/getall',this.option)
      .pipe(map(data => data));
  }
  ngDelete(datos) {
    return this.http.delete(this.url_serve + '/api/asociacion/'+datos,this.option)
      .pipe(map(data => data));
  }
  ngUpdate(datos,id) {
    return this.http.put(this.url_serve + '/api/asociacion/'+id, datos,this.option)
      .pipe(map(data => data));
  }
  ngAdd(datos) {
    
    return this.http.post(this.url_serve + '/api/asociacion/add', datos,this.option)
      .pipe(map(data => data));
  }
  nggetlist(){
    return this.http.get(this.url_serve + '/api/asociacion/list')
    .pipe(map(data => data));
  }

}
