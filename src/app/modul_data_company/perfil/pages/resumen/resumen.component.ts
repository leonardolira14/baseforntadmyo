import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../../services/events-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
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
 
}
