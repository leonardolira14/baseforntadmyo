import { Component, OnInit } from '@angular/core';
import { SearchServicesService } from '../../../services/search/search-services.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { ActivatedRoute } from '@angular/router';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  estados = [];
  estado = '';
  numerocal = '';
  palabra = '';
  data_company = [];
  numresultados = 0;
  constructor(
    private http: SearchServicesService,
    private http_service: EventsServiceService,
    private activeroute: ActivatedRoute,
    private serivice_cokie: Serviecokie,
  ) {
    this.data_company = this.serivice_cokie.getCokie('data_company');
    // tslint:disable-next-line: deprecation
    this.activeroute.params.subscribe(data => {
      this.palabra = data['palabra']
    })
  }

  ngOnInit(): void {
    this.http_service.preloadEvent$.emit(false);
    this.ngGetEstados();
    this.ngBusqueda();
  }
  ngGetEstados() {
    this.http.ngObtenerEstados()
      .subscribe(data => {
        this.estados = data['response']['result'];
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
  ngBusqueda() {
    this.http_service.periodoImagen$.emit(true);
    let company = '';
    if (this.data_company.length !== 0) {
      company = this.data_company['IDEmpresa']
    }
    const datos = { Ubicacion: this.estado, calificacion: this.numerocal, Palabra: this.palabra, IDEmpresaEmisora: company};
    console.log(datos);
    this.http.nueva_busqueda(datos)
      .subscribe(data => {
        this.numresultados = data['numeroresultados'];
        this.http.ListaResultados$.emit(data['resultados']);
        console.log(data);
        this.http_service.periodoImagen$.emit(false);
      }, error => {
          this.http_service.periodoImagen$.emit(false);
          console.log(error);
      });
  }
  ngClear() {
    this.estado = '';
    this.numerocal = '';
  }

}
