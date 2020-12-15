import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../../../services/events-service.service';
import { RiesgoServiceService } from '../../../services/riesgo/riesgo-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  como = '';
  tiempo = '';
  plural = '';
  cambio = '';
  comoplural = 'clientes';
  constructor(
    private servive_events: EventsServiceService,
    private rutaActiva: ActivatedRoute,
    private http: RiesgoServiceService
  ) {
    this.rutaActiva.params.subscribe(data => {
      console.log(data);
      this.como = data['como'];
      this.tiempo = data['tiempo'];
      // plural 
      if (this.como === 'cliente') {
        this.plural = 'clientes'
      }
      if (this.como === 'proveedor') {
        this.plural = 'proveedores';
      }
    });
   }

  ngOnInit(): void {
   
  }
  ngCambio(event) {
    if (this.cambio === 'cliente') {
      this.comoplural = 'clientes';
    }
    if (this.cambio === 'proveedor') {
      this.comoplural = 'proveedores';
    }
    const datos = { quienes: this.como, comoque: this.cambio}
    this.http.TipoCliente$.emit(datos);
  }
}
