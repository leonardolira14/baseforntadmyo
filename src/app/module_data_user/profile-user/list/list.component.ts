import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/data_user/user-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { List } from '../../class/List-class';
import { environment } from '../../../../environments/environment.prod';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data_user = [];
  palabra = '';
  List_usuarios = new List();
  lista_usuarios = [];
  data_company = [];
  token = '';
  constructor(
    private http_services: EventsServiceService,
    public http: UserServiceService,
    private serviceCoooki: Serviecokie,
  ) {
    this.data_user = this.serviceCoooki.getCokie('data_user');
    this.http.NewMarca$.subscribe(data => {
      this.ngGetall();
    })
    this.data_company = this.serviceCoooki.getCokie('data_company');
    this.token = this.serviceCoooki.getCokie('token');
   }

  ngOnInit(): void {
    this.ngGetall();
  }
  ngGetall() {
    this.List_usuarios.clearlist();
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token };
    this.http.service_getall(datos)
      .subscribe(data => {
        data['result'].forEach(item => {
          this.List_usuarios.additem(item['IDUsuario'], item['Nombre'], item['Apellidos'], item['Visible'], item['Tipo_Usuario'], item['IDEmpresa'], item['Correo'], item['Imagen'], item['Status'], item['Puesto']);
        });
        this.lista_usuarios = this.List_usuarios.getLista();
        console.log(data);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
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

  buscar() {
    this.lista_usuarios = this.List_usuarios.busquedapalabra(this.palabra);
  }

  ngEdit(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const data = this.List_usuarios.GetMarca(index);
    this.http.dataMarca$.emit(data);
  }
  ngDelete(index, status) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    if (status === '1') {
      status = '0';
    } else {
      status = '1';
    }
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token, IDUsuario: index, Status: status };
    this.http.ngDelete(datos)
      .subscribe(data => {
        console.log(data);
        this.ngGetall();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngMaster(index) {
    if (this.data_user['Tipo_Usuario']==='') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const opcion = confirm('Esta seguro de cambiar el usuario master');
    if (!opcion) {
      return;
    }
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], token: this.token, IDUsuario: index };
    this.http.ngMaster(datos)
      .subscribe(data => {
        this.ngGetall();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
}
