import { Component, OnInit } from '@angular/core';
import { RealizadasServiceService } from '../../../../services/realizadas/realizadas-service.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.scss']
})
export class ListaclientesComponent implements OnInit {
  listaClientes = [];
  constructor(
    private http: RealizadasServiceService,
  ) {
    this.http.ListaClientes$.subscribe(data => {
      console.log(data);
      this.listaClientes = data;
    });
   }

  ngOnInit(): void {
  }
  ngLogo(logo_) {
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logosEmpresas/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      return base_logo;
    } else {
      return logo;
    }
  }
  ngCalificar(item) {
    console.log(item);
  }
  ngVisitarperil(item) {
    console.log(item);
  }
  ngbaja(item) {
    console.log(item);
  }

}
