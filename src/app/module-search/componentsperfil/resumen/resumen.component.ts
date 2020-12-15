import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchServicesService } from '../../../services/search/search-services.service';
import { Serviecokie } from '../../../library/servercokie';
import { EventsServiceService } from '../../../services/events-service.service';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  token = '';
  public data_result_imagen:any;
  public data_result_riesgo: any;
  idEmpresa = '';
  periodo = '';
  constructor(
    private http: SearchServicesService,
    private services_cookie: Serviecokie,
    private rutaactiva: ActivatedRoute,
    private http_services: EventsServiceService
  ) {
    this.rutaactiva.params.subscribe(data => {
      this.idEmpresa = data['empresa'];
      this.periodo = data['periodo'];
      console.log(data);
    });
    this.token = this.services_cookie.getCokie('token');
    this.ngdata();
   }

  ngOnInit(): void {
    
  }
  ngdata() {
    console.log('entra')
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDEmpresa: this.idEmpresa, Periodo: this.periodo };
    console.log(datos);
    this.http.ngDataPerfil(datos)
      .subscribe(data => {
        console.log(data);
        this.http_services.preloadEvent$.emit(false);
        this.data_result_imagen = data['imagen'];
        this.data_result_riesgo = data['riesgo'];
       
      }, error => {
          this.http_services.preloadEvent$.emit(false);
          console.log(error);
      });
  }


}
