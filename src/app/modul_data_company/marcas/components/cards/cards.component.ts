import { Component, OnInit } from '@angular/core';
import { MarcasServiceService} from '../../../../services/data_company/marcas-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { ListaClass } from '../../class/list-marca';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  data_empresa = [];
  token = '';
  ListMarcas = new ListaClass();
  listadomarcas = [];
  palabra = '';
  data_user: [];
  constructor(
    private http_services: EventsServiceService,
    private http: MarcasServiceService,
    private service_cokie: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.data_empresa = this.service_cokie.getCokie('data_company');
    this.data_user = this.service_cokie.getCokie('data_user');
    this.token = this.service_cokie.getCokie('token');
    this.http.NewMarca$.subscribe(data => {
      this.ngGetlist();
    });
   }

  ngOnInit(): void {
    this.ngGetlist();
  }
  ngGetlist() {
    this.http_services.preloadEvent$.emit(true);
    this.http.service_getall()
      .subscribe(data => {
       
        this.ListMarcas.clearlist();
        data['data'].forEach(item => {
          this.ListMarcas.additem(item);
        });
        this.listadomarcas = this.ListMarcas.getLista();

      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        if(error.status === 500){
          Swal.fire('Error',error.error.msg,'error');
        }
        if(error.status === 400){
          Swal.fire('Error',error.error.msg,'error');
        }
        if(error.status === 404){
          Swal.fire('Error',error.error.msg,'error');
        }

        console.log(error);
   
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  dameLogo(logo_) {
    
    if (logo_ === '' || logo_ === null || logo_ === undefined) {
      return '/assets/img/foto-no-disponible.jpg';
    } else {
      return this.DomSanitizer.bypassSecurityTrustUrl(logo_);
    }
  }
  ngEdit(index) {
   
    const datos = this.ListMarcas.GetMarca(index);
    this.http.dataMarca$.emit(datos);
    
  }
  ngDelete(index) {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta marca?',
      icon: 'info',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
  
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http_services.preloadEvent$.emit(true);
        this.http.ngDelete(index)
          .subscribe(data => {
            this.ngGetlist();
            Swal.fire('Exito','Marca Eliminada','success');
          }, (error: HttpErrorResponse) => {
            this.http_services.preloadEvent$.emit(false);
            Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'error');
            console.log(error);
            console.log(error.error, error.status);
          }, () => this.http_services.preloadEvent$.emit(false));
      }
    })
   
    
  }
  buscar() {
    this.listadomarcas = this.ListMarcas.busquedapalabra(this.palabra);
  }

}
