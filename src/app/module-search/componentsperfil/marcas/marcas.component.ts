import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serviecokie } from '../../../library/servercokie';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../services/events-service.service';
import { MarcasServiceService } from '../../../services/data_company/marcas-service.service';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  token = '';
  listadomarcas = [];
  idEmpresa;
  constructor(
    private http_services: EventsServiceService,
    private http: MarcasServiceService,
    private service_cokie: Serviecokie,
    private rutaactiva: ActivatedRoute
  ) {
    this.rutaactiva.params.subscribe(data => {
      this.idEmpresa = data['empresa'];
    });
    this.token = this.service_cokie.getCokie('token');
    this.ngGetlist();
  }

  ngOnInit(): void {
  }
  ngGetlist() {
    this.http_services.preloadEvent$.emit(true);
    const data = { IDEmpresa: this.idEmpresa , token: this.token };
    this.http.service_getall(data)
      .subscribe(data => {
        this.listadomarcas = data['Marcas'];

      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  dameLogo(logo_) {
    const base_logo = '/assets/img/foto-no-disponible.jpg';
    const logo = environment.url_serve + 'assets/img/logosmarcas/' + logo_;
    if (logo_ === '' || logo_ === null || logo_ === 'null') {
      return base_logo;
    } else {
      return logo;
    }
  }
}
