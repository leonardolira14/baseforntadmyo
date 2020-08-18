import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';

@Component({
  selector: 'app-recibidas',
  templateUrl: './recibidas.component.html',
  styleUrls: ['./recibidas.component.scss']
})
export class RecibidasComponent implements OnInit {

  constructor(
    private http_service: EventsServiceService
  ) {
  }

  ngOnInit(): void {
    this.http_service.preloadEvent$.emit(false);
  }

}
