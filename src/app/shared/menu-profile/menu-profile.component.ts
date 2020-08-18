import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Serviecokie } from '../../library/servercokie';
@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],
  providers: [NgbDropdownConfig]
})
export class MenuProfileComponent implements OnInit {
  inac = false;
  iteempresa = false;
  riesgo = false;
  analisi = false;
  imagen = false;
  califica = false;
  constructor(
    config: NgbDropdownConfig,
    private route: Router,
    private server_cookie: Serviecokie
  ) {
    if (!this.server_cookie.getCokie('data_company')) {
      this.ir('');
    }
    config.placement = 'bottom-right';
   }

  ngOnInit(): void {
    console.log(this.route.navigate);
  }
  ir(ruta) {
    this.route.navigateByUrl('/' + ruta);
  }
  entramenu(tipo: any) {
    if (tipo === 'empresa') {
      this.iteempresa = !this.iteempresa;
      this.riesgo = false;
      this.analisi = false;
      this.imagen = false;
      this.califica = false;
    }
    if (tipo === 'riesgo') {
      this.analisi = false;
      this.iteempresa = false;
      this.riesgo = !this.riesgo;
      this.imagen = false;
      this.califica = false;
    }
    if (tipo === 'imagen') {
      this.analisi = false;
      this.iteempresa = false;
      this.riesgo = false;
      this.imagen = !this.imagen;
      this.califica = false;
    }
    if (tipo === 'analisi') {
      this.iteempresa = false;
      this.riesgo = false;
      this.analisi = !this.analisi;
      this.califica = false;
    }
    if (tipo === 'califica') {
      this.iteempresa = false;
      this.riesgo = false;
      this.analisi = false;
      this.califica = !this.califica;
    }

  }
  close_menu() {
    this.analisi = false;
    this.iteempresa = false;
    this.riesgo = false;
    this.imagen = false;
  }
  close_sesion() {
    this.inac = false;
    this.server_cookie.deleteAllCookie();
    this.ir('');
  }
}
