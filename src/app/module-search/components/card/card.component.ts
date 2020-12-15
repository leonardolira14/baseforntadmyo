import { Component, OnInit } from '@angular/core';
import { SearchServicesService } from '../../../services/search/search-services.service';
import { environment } from '../../../../environments/environment';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  registros = [];
  data_company = [];
  constructor(
    private http: SearchServicesService,
    private serivice_cokie: Serviecokie,
  ) { 
    this.data_company = this.serivice_cokie.getCokie('data_company');
    this.http.ListaResultados$.subscribe(data => {
      this.registros = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
  }
  damelogo(logo) {
   
    let login = '/assets/img/foto-no-disponible.jpg';
    if (logo === "" || logo === null) {
      return login;
    } else {
     return login = environment.url_serve + 'assets/img/logosEmpresas/' + logo;
    }
   
  }
  seguir(index) {
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], IDEmpresaB: index }
    if (index === this.data_company['IDEmpresa']) {
      return false;
    } else {
      console.log(datos);
      this.http.ngFollow(datos)
        .subscribe(data => {
          window.location.reload();
          console.log(data);
        }, error => {
          console.log(error);
        });
    }
  }
  visitar(index) {
    console.log(index);
  }
}
