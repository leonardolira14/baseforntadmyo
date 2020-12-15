import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  constructor(
    private http_service: EventsServiceService,
  ) { }

  ngOnInit(): void {
   
  }

}
