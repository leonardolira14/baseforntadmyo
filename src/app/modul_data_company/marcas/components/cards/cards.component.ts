import { Component, OnInit } from '@angular/core';
import { MarcasServiceService} from '../../../../services/data_company/marcas-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { ListaClass } from '../../class/list-marca';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
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
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_empresa = this.service_cokie.getCokie('data_company');
    this.data_user = this.service_cokie.getCokie('data_user');
    this.token = this.service_cokie.getCokie('token');
    this.http.NewMarca$.subscribe(data => {
      this.ngGetlist();
    });
   }

  ngOnInit(): void {
    this.ngGetlist();
  }
  ngGetlist() {
    this.http_services.preloadEvent$.emit(true);
    const data = { IDEmpresa: this.data_empresa['IDEmpresa'], token: this.token};
    this.http.service_getall(data)
      .subscribe(data => {
        this.ListMarcas.clearlist();
        data['Marcas'].forEach(item => {
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
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logosmarcas/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      return base_logo;
    } else {
      return logo;
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
  buscar() {
    this.listadomarcas = this.ListMarcas.busquedapalabra(this.palabra);
  }

}
