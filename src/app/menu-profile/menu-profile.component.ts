import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],
  providers: [NgbDropdownConfig]
})
export class MenuProfileComponent implements OnInit {
  iteempresa = false;
  riesgo = false;
  analisi = false;
  constructor(config: NgbDropdownConfig) {

    config.placement = 'bottom-right';
   }

  ngOnInit(): void {
  }
  entramenu(tipo: any) {
    if (tipo === 'empresa') {
      this.iteempresa = !this.iteempresa;
      this.riesgo = false;
      this.analisi = false;
    }
    if (tipo === 'riesgo') {
      this.analisi = false;
      this.iteempresa = false;
      this.riesgo = !this.riesgo;

    }
    if (tipo === 'analisi') {
      this.iteempresa = false;
      this.riesgo = false;
      this.analisi = !this.analisi;
    }

  }

}
