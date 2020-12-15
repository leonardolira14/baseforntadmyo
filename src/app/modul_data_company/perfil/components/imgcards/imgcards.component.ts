import { Component, OnInit } from '@angular/core';
import { SearchServicesService } from '../../../../services/search/search-services.service';
import { Serviecokie } from '../../../../library/servercokie';
import { EventsServiceService } from '../../../../services/events-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-imgcards',
  templateUrl: './imgcards.component.html',
  styleUrls: ['./imgcards.component.scss']
})
export class ImgcardsComponent implements OnInit {
  data_company: [];
  data_perfil_imagen: any;
  data_perfil_riesgo: any;
  periodo = 'MA';
  constructor(
    private http_search: SearchServicesService,
    private cookieservices: Serviecokie,
    private http_services: EventsServiceService,
    private activerouter: ActivatedRoute
  ) {
    this.data_company = this.cookieservices.getCokie('data_company');
    this.activerouter.params.subscribe(data => {
      this.periodo = data['tiempo'];
    });
   }

  ngOnInit(): void {
    this.obtener_perfil();
  }
  obtener_perfil() {
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], Periodo: this.periodo };
    this.http_search.ngDataPerfil(datos)
      .subscribe(data => {
        this.http_services.preloadEvent$.emit(false);
        this.data_perfil_imagen = data['imagen'];
        this.data_perfil_riesgo = data['riesgo'];
        console.log(data);
      }, error => {
          this.http_services.preloadEvent$.emit(false);
        console.log(error);
      });
  }
}
