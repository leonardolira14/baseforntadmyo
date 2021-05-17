import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserServiceService } from '../../../services/data_user/user-service.service';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  token = '';
  usuarios_list = [];
  idEmpresa;
  constructor(
    private http_services: EventsServiceService,
    private http: UserServiceService,
    private service_cookie: Serviecokie,
    private rutaactiva: ActivatedRoute
  ) { 
    this.http_services.preloadEvent$.emit(true);
    this.token = this.service_cookie.getCokie('token');
    this.rutaactiva.params.subscribe(data => {
      this.idEmpresa = data['empresa'];
    });
    this.ngGetAll();
  }

  ngOnInit(): void {
  }
  ngGetAll() {
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.idEmpresa, token: this.token };
    this.http.service_getall()
      .subscribe(data => {
        
        this.usuarios_list = data['result'];
        console.log(this.usuarios_list);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

  dameLogo(logo_) {
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logosUsuarios/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      return base_logo;
    } else {
      return logo;
    }
  }
}
