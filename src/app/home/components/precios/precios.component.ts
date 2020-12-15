import { Component, OnInit } from '@angular/core';
import { ServiceDataCompanyService } from '../../../services/service-data-company.service';

// tslint:disable-next-line: class-name
export interface precios{
  texto: string;
  a: boolean;
  b: boolean;
  c: boolean;
}
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  public beneficios: any;
  plan_seleccionado = 'basic';
  texto_plan = 'Basico Gratis';
  constructor(
    private http: ServiceDataCompanyService
  ) {

  }

  ngOnInit(): void {
    this.http.obtenerprecios()
      .subscribe(data => {
        this.beneficios = data;
      }, erro => {
        console.log(erro);
      });
  }
  ngChangeprecio() {
    switch (this.plan_seleccionado) {
      case 'basic':
        this.texto_plan = 'Basico Gratis';
        break;
      case 'MCM':
        this.texto_plan = 'Micro Empresa (Mensual)';
        break;
      case 'MCA':
        this.texto_plan = 'Micro Empresa (Mensual)';
        break;
      case 'EM':
        this.texto_plan = 'Empresarial (Mensual)';
        break;
      case 'EA':
        this.texto_plan = 'Empresarial (Anual)';
        break;
    }
  }

}
