import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/data_user/user-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { List } from '../../class/List-class';
import { environment } from '../../../../environments/environment.prod';
import { EventsServiceService } from '../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data_user = [];
  palabra = '';
  List_usuarios = new List();
  lista_usuarios = [];
  data_company = [];
  token = '';
  constructor(
    private http_services: EventsServiceService,
    public http: UserServiceService,
    private serviceCoooki: Serviecokie,
    private DomSanitizer : DomSanitizer
  ) {
    this.data_user = this.serviceCoooki.getCokie('data_user');
    this.http.NewMarca$.subscribe(data => {
      this.ngGetall();
    })
    this.data_company = this.serviceCoooki.getCokie('data_company');
    this.token = this.serviceCoooki.getCokie('token');
   }

  ngOnInit(): void {
    this.ngGetall();
  }
  ngGetall() {
    this.List_usuarios.clearlist();
    
    this.http.service_getall()
      .subscribe(data => {
        
        data['data'].forEach(item => {
          this.List_usuarios.additem(item['id'], item['Nombre'], item['Apellidos'], item['Visible'], item['Tipo_Usuario'], item['Correo'], item['Logo'], item['Status'], item['Puesto']);
        });
        this.lista_usuarios = this.List_usuarios.getLista();
      
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'error');
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

  buscar() {
    this.lista_usuarios = this.List_usuarios.busquedapalabra(this.palabra);
  }

  ngEdit(index) {
   
    const data = this.List_usuarios.GetMarca(index);
    this.http.dataMarca$.emit(data);
  }
  ngDelete(index) {
    
    
   
    this.http.ngDelete(index)
      .subscribe(data => {
        console.log(data);
        Swal.fire("Exito",'El usario se dio de baja, ya no podra ingresar a admyo.com, las calificaciones que realizo seguiran apareciondo en el sistema','success');
        this.ngGetall();
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        Swal.fire('Error','algo paso ' + error.message + ' Status: ' + error.status,'error');
        console.log(error);
      }, () => this.http_services.preloadEvent$.emit(false));
  }
  ngMaster(index) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http.ngMaster(index)
        .subscribe(data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario master actualizado',
            showConfirmButton: false,
            timer: 1500
          })
         
          this.ngGetall();
        }, (error: HttpErrorResponse) => {
          this.http_services.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
        }, () => this.http_services.preloadEvent$.emit(false));
      } 
    })


  
   
    
  }
}
