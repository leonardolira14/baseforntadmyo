import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealizadasServiceService } from '../../../../services/realizadas/realizadas-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { EventsServiceService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-filtroclientes',
  templateUrl: './filtroclientes.component.html',
  styleUrls: ['./filtroclientes.component.scss']
})
export class FiltroclientesComponent implements OnInit {
  tipo = '';
  data_company: [];
  token = '';
  public palabra = '';
  numero = 0;
  text = '';
  constructor(
    private http_services: EventsServiceService,
    private cookieservices: Serviecokie,
    private http: RealizadasServiceService,
    private rutaActiva: ActivatedRoute,
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.token = this.cookieservices.getCokie('token');
    this.data_company = this.cookieservices.getCokie('data_company');
    this.rutaActiva.params.subscribe(data => {

      this.tipo = data['quien'];
      if (this.tipo ==='cliente') {
        this.text = 'Clientes';
      } else {
        this.text = 'Proveedores';
      }
      this.ngList();
    });
   }

  ngOnInit(): void {
    console.log(this.tipo);
  }
  ngList() {
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], tipo: this.tipo };
    this.http.ngListaClientes(datos)
      .subscribe(data => {
        this.numero = data['response']['result'].length ;
        this.http.ListaClientes$.emit(data['response']['result']);
        console.log(data);
        this.http_services.preloadEvent$.emit(false);
      }, error => {
          this.http_services.preloadEvent$.emit(false);
          alert('Ocurrio un problema');
          console.log(error);
      });
  }
  ngfiltrar() {
    this.http_services.preloadEvent$.emit(true);
    const datos = {tipo:this.tipo, IDEmpresa: this.data_company['IDEmpresa'], filtros: { nombre: this.palabra } };
    this.http.ngFilterclie(datos)
      .subscribe(data => {
        this.http.ListaClientes$.emit(data['response']['result']);
        this.numero = data['response']['result'].length;
        console.log(data);
        this.http_services.preloadEvent$.emit(false);
      }, error => {
          this.http_services.preloadEvent$.emit(false);
          alert('Ocurrio un problema');
          console.log(error);
      });
  }

}
