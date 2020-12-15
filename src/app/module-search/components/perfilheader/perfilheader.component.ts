import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { environment } from 'environments/environment';
import { SearchServicesService } from '../../../services/search/search-services.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-perfilheader',
  templateUrl: './perfilheader.component.html',
  styleUrls: ['./perfilheader.component.scss']
})
export class PerfilheaderComponent implements OnInit {
  public data_company = [];
  public data_company_search = [];
  public ruta_Server = environment.url_serve;
  empresaemisora = 0;
  idEmpresa;
  constructor(
    private services: EventsServiceService,
    private serviceCookie: Serviecokie,
    private http: SearchServicesService,
    private ruta_activa: ActivatedRoute
  ) {
    this.services.preloadEvent$.emit(false);
    if (this.serviceCookie.getCokie('data_company')) {
      this.data_company = this.serviceCookie.getCokie('data_company')
      this.empresaemisora = this.data_company['IDEmpresa'];
    }
    this.ruta_activa.params.subscribe(data => {
      console.log(data);
      this.idEmpresa = data['empresa'];
      this.getData();
    });
   }

  ngOnInit(): void {
    
  }
  getData() {
    
    if (this.serviceCookie.getCokie('data_company_search')) {
      this.data_company_search = this.serviceCookie.getCokie('data_company_search');
      console.log(this.data_company_search['IDEmpresa'],this.idEmpresa);
      if (this.data_company_search['IDEmpresa'] !== this.idEmpresa) {
        //this.getdatas();
        console.log('msbdgf')

      }
    } else {
      this.getdatas();
    
    }
  }
  getdatas() {
    this.services.preloadEvent$.emit(true);
    const datos = { IDEmpresaEmisora: this.empresaemisora, IDEmpresa: this.idEmpresa }
    this.http.ngDataPerfilDatos(datos)
      .subscribe(data => {
        console.log(data);
        this.data_company_search = data['response']['result']['datosempresa'];
        this.services.preloadEvent$.emit(false);
        console.log(this.data_company_search);
        this.serviceCookie.setCookie('data_company_search', this.data_company_search);
      }, error => {
        this.services.preloadEvent$.emit(false);
        console.log(error);
      });
  }
  damelogo() {
    if (this.data_company_search['Logo'] === '' || this.data_company_search['Logo'] === null) {
      return 'assets/img/foto-no-disponible.jpg';
    } else {
      return this.ruta_Server + '/assets/img/logosEmpresas/' + this.data_company_search['Logo'];

    }

  }

}
