import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dataperfil',
  templateUrl: './dataperfil.component.html',
  styleUrls: ['./dataperfil.component.scss']
})
export class DataperfilComponent implements OnInit {

  constructor(
    private http_services: EventsServiceService,
    private rutaActiva: ActivatedRoute
  ) { 
    this.rutaActiva.params.subscribe(data => {
      console.log(data);
    });
    
  }

  ngOnInit(): void {
    this.http_services.preloadEvent$.emit(false);
  }

}
