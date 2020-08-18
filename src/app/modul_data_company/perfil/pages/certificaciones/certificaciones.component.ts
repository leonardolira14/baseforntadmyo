import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss']
})
export class CertificacionesComponent implements OnInit {

  constructor(
    private http_service: EventsServiceService,
  ) {
    this.http_service.preloadEvent$.emit(false);
   }
  ngOnInit(): void {

  }


}
