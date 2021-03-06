import { Component, OnInit } from '@angular/core';
import { CertificationsServiceService } from '../../../../services/data_company/certifications-service.service';
import { ListaClass } from '../../../certifications/class/class_list_certifications';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Serviecokie } from '../../../../library/servercokie';

@Component({
  selector: 'app-cardcertification',
  templateUrl: './cardcertification.component.html',
  styleUrls: ['./cardcertification.component.scss']
})
export class CardcertificationComponent implements OnInit {
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
  ) {
    
    this.Token = this.service_cokie.getCokie('token');
    this.data_company = this.service_cokie.getCokie('data_company');
    this.data_user = this.service_cokie.getCokie('data_user');
    
  }

  ngGetall() {
    this.http_service.preloadEvent$.emit(true);
    this.ListCertifications.clearlist();
    this.http.service_getall()
      .subscribe(data => {
        data['result'].forEach(item => {
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
  ngOnInit(): void {
    this.ngGetall();
  }
  ngGetList() {
    this.certification = this.ListCertifications.getLista();
    console.log(this.certification)
    this.http_service.preloadEvent$.emit(false);
  }
  ngUpdate(IDCertification) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    const certifiation: any = this.ListCertifications.GetCertification(IDCertification);
    this.http.Certification$.emit(certifiation);
  }
  // funcion para elimar una  certificacion
  ngDelete(IDCertificacion) {
    if (this.data_user['Tipo_Usuario'] === '') {
      alert('Solo el usuario Master puede hacer esta accion.');
      return;
    }
    this.http_service.preloadEvent$.emit(true);
    const data = { token: this.Token, IDNorma: IDCertificacion, IDEmpresa: this.data_company['IDEmpresa'] };
    this.http.ngDelete(data)
      .subscribe(data => {
        alert('Certificación Eliminada');
        this.ngGetall();
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
