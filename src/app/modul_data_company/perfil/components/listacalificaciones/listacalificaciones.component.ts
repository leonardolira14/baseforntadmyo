import { Component, OnInit } from '@angular/core';
import { RealizadasServiceService } from '../../../../services/realizadas/realizadas-service.service';
import { environment } from 'environments/environment';
import { EventsServiceService } from '../../../../services/events-service.service';
@Component({
  selector: 'app-listacalificaciones',
  templateUrl: './listacalificaciones.component.html',
  styleUrls: ['./listacalificaciones.component.scss']
})
export class ListacalificacionesComponent implements OnInit {
  list_calificaciones = [];
  modal_detalle = false;
  list_preguntas = [];
  Mediacal = '';
  constructor(
    private http: RealizadasServiceService,
    private http_services: EventsServiceService
  ) {
    this.http.Listacalificaciones$.subscribe(data => {
      this.list_calificaciones = data;
    });
   }

  ngOnInit(): void {
  }
  ngDetalle(index) {
    this.http_services.preloadEvent$.emit(true);
    const datos = { IDValora: index };
    this.http.ngDetalle(datos)
      .subscribe(data => {
        this.list_preguntas = data['response']['result']['lista'];
        this.Mediacal = data['response']['result']['media'];
        this.modal_detalle = true;

      }, error => {
        this.http_services.preloadEvent$.emit(false);
        console.log(error);
      }, () => {
         this.http_services.preloadEvent$.emit(false);
      });
  }
  ngOpenModalChange(index) {
    
  }
  ngLogo(value) {

    let cadena = 'assets/img/foto-no-disponible.jpg';
    if (value !== '') {
      cadena = environment.url_serve + 'assets/img/logosEmpresas/' + value;
    }
    return cadena;
  }
}
