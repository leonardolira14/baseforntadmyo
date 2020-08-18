import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cbuttons1',
  templateUrl: './cbuttons1.component.html',
  styleUrls: ['./cbuttons1.component.scss']
})
export class Cbuttons1Component implements OnInit {
  como = '';
  contrario = '';
  tiempo = '';
  constructor(
    private http_services: EventsServiceService,
    private rutaActiva: ActivatedRoute,
  ) {
    this.rutaActiva.params.subscribe(data => {
      console.log(data);
      this.como = data['como'];
      this.tiempo = data['tiempo'];

    });
    if (this.como === 'cliente') {
      this.contrario = 'proveedores';
    } else {
      this.contrario = 'clientes';
    }

   }

  ngOnInit(): void {
  }

}
