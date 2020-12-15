import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDataCompanyService } from '../../../services/service-data-company.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../services/events-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.scss']
})
export class ValidarComponent implements OnInit {
  token = '';
  succes = 'ok';
  constructor(
    private activeroute: ActivatedRoute,
    private http: ServiceDataCompanyService,
    private http_event: EventsServiceService
  ) {
    this.activeroute.params.subscribe(data => {
      console.log(data)
      this.token = data['token'];
    });
   }

  ngOnInit(): void {
    this.ngTokenValidate();
  }

  // funcion para validar token

  ngTokenValidate() {
    console.log(this.token);
    const datos = { token: this.token };
    this.succes = 'process';
    this.http_event.preloadEvent$.emit(false);
    this.http.activecuenta(datos)
      .subscribe(data => {
        this.http_event.preloadEvent$.emit(false);
        this.succes = 'ok';
        console.log(this.succes);
      }, (error: HttpErrorResponse) => {
          this.http_event.preloadEvent$.emit(false);
          this.succes = 'fail';
         
          Swal.fire('Erro', 'Error favor de contactar al administrador', 'error');
          console.log(error);
      });
  }

}
