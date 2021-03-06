import { Component, OnInit } from '@angular/core';
import { MarcasServiceService } from '../../../../services/data_company/marcas-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { ListaClass } from '../..../../../../marcas/class/list-marca';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-cardmarca',
  templateUrl: './cardmarca.component.html',
  styleUrls: ['./cardmarca.component.scss']
})
export class CardmarcaComponent implements OnInit {
  data_empresa = [];
  token = '';
  ListMarcas = new ListaClass();
  listadomarcas = [];
  palabra = '';
  data_user: [];
  constructor(
    private http_services: EventsServiceService,
    private http: MarcasServiceService,
    private service_cokie: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_empresa = this.service_cokie.getCokie('data_company');
    this.data_user = this.service_cokie.getCokie('data_user');
    this.token = this.service_cokie.getCokie('token');
    this.ngGetlist();
 
   }

  ngOnInit(): void {
    this.ngGetlist();
  }
  ngGetlist() {
    this.http_services.preloadEvent$.emit(true);
    
    this.http.service_getall()
      .subscribe(data => {
        this.ListMarcas.clearlist();
        data['data'].forEach(item => {
          this.ListMarcas.additem(item);
        });
        this.listadomarcas = this.ListMarcas.getLista();

      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  dameLogo(logo_) {
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      return '/assets/img/foto-no-disponible.jpg';
    } else {
      return this.DomSanitizer.bypassSecurityTrustUrl(logo_);
    }
  }
  ngEdit(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const datos = this.ListMarcas.GetMarca(index);
    this.http.dataMarca$.emit(datos);
    console.log(datos);
  }
  ngDelete(index) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const data = { IDMarca: index, IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token };
    this.http_services.preloadEvent$.emit(true);
    this.http.ngDelete(data)
      .subscribe(data => {
        this.ngGetlist();
        alert('Marca Eliminada');
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

}
