import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-botonessup',
  templateUrl: './botonessup.component.html',
  styleUrls: ['./botonessup.component.scss']
})
export class BotonessupComponent implements OnInit {
  activo_mes = false;
  activo_mes_MA = true;
  activo_mes_anio = false;
  tiempo = 'M';
  text = 'f5g4d5fg';
  idempresa= '';
  constructor(
    private ruta_activa: ActivatedRoute
  ) {
    
    this.ruta_activa.params.subscribe(data => {
      this.idempresa = data['empresa'];
      this.tiempo = data['periodo'];
    });
    if (this.tiempo === 'M') {
      this.activo_mes = true;
      this.activo_mes_MA = false;
      this.activo_mes_anio = false;
    } else if (this.tiempo === 'MA') {
      this.activo_mes = false;
      this.activo_mes_MA = true;
      this.activo_mes_anio = false;
    } else {
      this.activo_mes = false;
      this.activo_mes_MA = false;
      this.activo_mes_anio = true;
    }
   }

  ngOnInit(): void {
  }

}
