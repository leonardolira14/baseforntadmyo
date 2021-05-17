import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificationsServiceService } from '../../../services/data_company/certifications-service.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss']
})
export class CertificacionesComponent implements OnInit {
  private Token = '';
  lista = [];
  idEmpresa;
  constructor(
    private http_service: EventsServiceService,
    private http: CertificationsServiceService,
    private service_cokie: Serviecokie,
    private rutaactiva: ActivatedRoute
  ) {
    this.Token = this.service_cokie.getCokie('token');
    this.rutaactiva.params.subscribe(data => {
      this.idEmpresa = data['empresa'];
    });
   }

  ngOnInit(): void {
    this.ngGetall();
  }
  ngGetall() {
    this.http_service.preloadEvent$.emit(true);
   
    this.http.service_getall()
      .subscribe(data => {
        console.log(data);
        this.lista = data['result'];
      }, (error: HttpErrorResponse) => {
        this.http_service.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => {
        this.http_service.preloadEvent$.emit(false);
      });
  }
}
