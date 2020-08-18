import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../../services/events-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-barralogo',
  templateUrl: './barralogo.component.html',
  styleUrls: ['./barralogo.component.scss']
})
export class BarralogoComponent implements OnInit {
  public data_company = [];
  public ruta_Server = environment.url_serve;
  constructor(
    private services: EventsServiceService,
    private serviceCookie: Serviecokie
  ) {
    this.services.preloadEvent$.emit(false);
    this.data_company = this.serviceCookie.getCokie('data_company');
   }

  ngOnInit(): void {
  }
  damelogo() {
    if (this.data_company['Logo'] === '' || this.data_company['Logo'] === null) {
      return 'assets/img/foto-no-disponible.jpg';
    } else {
      return this.ruta_Server + '/assets/img/logosEmpresas/' + this.data_company['Logo'];

    }

  }
}
