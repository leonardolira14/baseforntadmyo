import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-buttons2detail',
  templateUrl: './buttons2detail.component.html',
  styleUrls: ['./buttons2detail.component.scss']
})
export class Buttons2detailComponent implements OnInit {
  como: string;
  tiempo: string;
  contrario: string;
  activo_mes = false;
  activo_mes_MA = true;
  activo_mes_anio = false;
  fecha = new Date();
  text = this.fecha.getDay() + ' ' + this.fecha.getFullYear();
  constructor(
    private rutaActiva: ActivatedRoute,
  ) {
    this.rutaActiva.params.subscribe(data => {

      this.como = data['como'];
      this.tiempo = data['tiempo'];
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
    });
   }

  ngOnInit(): void {
  }

}
