import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
import { ActivatedRoute } from '@angular/router';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  como = '';
  tiempo = '';
  data_company: [];
  token = '';
  constructor(
    private http_services: EventsServiceService,
    private rutaActiva: ActivatedRoute,
    private cookieservices: Serviecokie
  ) {

    this.token = this.cookieservices.getCokie('token');
    this.data_company = this.cookieservices.getCokie('data_company');
    this.http_services.preloadEvent$.emit(false);
    this.rutaActiva.params.subscribe(data => {
      console.log(data);
      this.como = data['como'];
      this.tiempo = data['tiempo'];

    });
   }

  ngOnInit(): void {
  }

}
