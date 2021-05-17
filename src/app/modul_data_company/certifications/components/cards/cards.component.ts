import { Component, OnInit } from '@angular/core';
import { CertificationsServiceService } from '../../../../services/data_company/certifications-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ListaClass } from '../../class/class_list_certifications';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../../library/servercokie';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public ListCertifications = new ListaClass();
  public data_company: [];
  private Token = '';
  public palabra;
  public certification: any;
  private R_certification: [];
  private data_user: [];
  constructor(
    private http_service: EventsServiceService,
    private http: CertificationsServiceService,
    private service_cokie: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.http_service.preloadEvent$.emit(true);
    this.Token = this.service_cokie.getCokie('token');
    this.data_company = this.service_cokie.getCokie('data_company');
    this.data_user = this.service_cokie.getCokie('data_user');
    this.http.NewCertification$.subscribe(data => {
      if (data) {
        this.ngGetall();
      }
    });
  }

  ngOnInit(): void {
    this.ngGetall();
  }
  ngGetall() {
    this.http_service.preloadEvent$.emit(true);
    this.ListCertifications.clearlist();
    this.http.service_getall()
      .subscribe(data => {
        console.log(data);
        data['data'].forEach(item => {
          this.ListCertifications.additem(item);
        });
        this.ngGetList();
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
  ngGetList() {
    this.certification = this.ListCertifications.getLista();
  }
  ngBuscar() {
    this.certification = this.ListCertifications.busquedapalabra(this.palabra);
  }
  ngUpdate(IDCertification) {
    
    const certifiation: any = this.ListCertifications.GetCertification(IDCertification);
  
    this.http.Certification$.emit(certifiation);
  }
  // funcion para elimar una  certificacion
  ngDelete(IDCertificacion) {
    
    this.http_service.preloadEvent$.emit(true);
    this.http.ngDelete(IDCertificacion)
      .subscribe(data => {
       Swal.fire('Exito','Certificación eliminada','success');
        this.ngGetall();
      }, (error: HttpErrorResponse) => {
          this.http_service.preloadEvent$.emit(false);
          if(error.status === 500){
            Swal.fire('Error','Error favor de contactar al administrador','info');
          }
          if(error.status === 404){
            Swal.fire('Error',error.error.msg,'info');
          }
          if(error.status === 400){
            Swal.fire('Error',error.error.msg,'info');
          }
          console.log(error);
      }, () => {
        this.http_service.preloadEvent$.emit(false);
      });
  }
  converterurl_(url){
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }
}

