import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
@Component({
  selector: 'app-qualify',
  templateUrl: './qualify.component.html',
  styleUrls: ['./qualify.component.scss']
})
export class QualifyComponent implements OnInit {
  valora = '';
  tipo = '';
  constructor(

    private http_services: EventsServiceService
  ) {

  }

  ngOnInit(): void {
    this.http_services.preloadEvent$.emit(false);
  }


}
