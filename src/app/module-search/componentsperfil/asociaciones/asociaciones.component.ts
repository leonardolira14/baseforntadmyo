import { Component, OnInit } from '@angular/core';
import { CertificationsServiceService } from '../../../services/data_company/certifications-service.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../library/servercokie';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html',
  styleUrls: ['./asociaciones.component.scss']
})
export class AsociacionesComponent implements OnInit {
  private Token = '';
  public certification: any;
  idEmpresa = '';
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
    this.ngGetall();
   }

  ngOnInit(): void {
  }
  ngGetall() {
    this.http_service.preloadEvent$.emit(true);
    const data = { IDEmpresa: this.idEmpresa, Token: this.Token };
    this.http.service_getall(data)
      .subscribe(data => {
        this.certification = data['result'];
        console.log(this.certification);
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
