import { Component, OnInit } from '@angular/core';
import { GirosServiceService } from '../../../../services/data_company/giros-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { ListaClass } from '../../class/list-giros';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  data_company = [];
  token = '';
  giros_empresa = [];
  ListaGiros = new ListaClass();
  palabra = '';
  data_user: [];
  constructor(
    private http_services: EventsServiceService,
    private http: GirosServiceService,
    private serviceCookie: Serviecokie
  ) {
    this.http.NewCertification$.subscribe(data => {
      this.ngGetList();
    });
    this.token = this.serviceCookie.getCokie('token');
    this.data_company = this.serviceCookie.getCokie('data_company');
    this.data_user = this.serviceCookie.getCokie('data_user');
  }

  ngOnInit(): void {
    this.ngGetList();
  }
  ngGetList() {
    this.http_services.preloadEvent$.emit(true);
    this.ListaGiros.clearlist();
    this.http.service_getall()
      .subscribe(data => {
        
        data['data'].forEach(item => {
          this.ListaGiros.additem(item);
        });
        this.giros_empresa = this.ListaGiros.getLista();
       
        this.http.ListaGirosemiter$.emit(data['allgiros']);
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso al actualizar un giro' + error.error + ' Status: ' + error.status,'error');
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngEditar(index) {
    const datos = this.ListaGiros.GetCertification(index);
    this.http.Certification$.emit(datos);
  }
  ngDelete(index) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este Giro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Aceptar`,

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http_services.preloadEvent$.emit(true);

        this.http.ngDelete(index)
          .subscribe(data => {
            Swal.fire('Exito','Giro Eliminado','success');
            this.ngGetList();
          }, (error: HttpErrorResponse) => {
            this.http_services.preloadEvent$.emit(false);
            Swal.fire('Error','algo paso al actualizar un giro' + error.error + ' Status: ' + error.status,'error');
            console.log(error);
          }, () => this.http_services.preloadEvent$.emit(false));
      }
    })
  }

  buscar() {
    this.giros_empresa = this.ListaGiros.busquedapalabra(this.palabra);
  }

  // hacer Principal
  ngPricipal(index) {
    
    this.http.NewCertification$.emit(true);
   
    this.http.service_principal(index)
      .subscribe(data => {
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Información actualizada',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngGetList();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso al actualizar un giro' + error.error + ' Status: ' + error.status,'error');
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

}
