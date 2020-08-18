import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttonssup',
  templateUrl: './buttonssup.component.html',
  styleUrls: ['./buttonssup.component.scss']
})
export class ButtonssupComponent implements OnInit {
  activo_mes = false;
  activo_mes_MA = true;
  activo_mes_anio = false;
  tiempo = 'M';
  text = 'f5g4d5fg';
  constructor() {
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
