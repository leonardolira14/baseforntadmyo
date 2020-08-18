import { Component, OnInit } from '@angular/core';
import { ImgenServiceService } from '../../../services/imagen_company/imgen-service.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { ListaCalificaciones } from '../../class/list_calificaciones';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public Lits_Calif_class = new ListaCalificaciones();
  public list_calificaciones = [];
  public list_preguntas = [];
  public modal_detalle = false;
  public modal_anular = false;
  public IDValoraTemp = 0;
  public model_motivo = '';
  Mediacal = '';
  
  constructor(
    private http: ImgenServiceService,
    private http_services: EventsServiceService
  ) {
    this.http.ListCalificaciones$.subscribe(data => {
      console.log(data);
      this.ngEnlist(data);
    });
    this.http.Filtros$.subscribe(data => {
      this.ngFiltrar(data);
    });
  }

  ngOnInit(): void {

  }
  ngFiltrar(filtrar) {
    
    console.log(filtrar);
    this.list_calificaciones = this.Lits_Calif_class.filtro(
      filtrar.Tipo, filtrar.cliente, filtrar.FechaInicio, filtrar.FechaFin, filtrar.Estado
    );
    this.http_services.preloadEvent$.emit(false);
  }
  ngEnlist(lista: []) {
    this.Lits_Calif_class.limpiarlista();
    lista.forEach(item => {
      this.Lits_Calif_class.add_medicamento(item);
    });
    this.list_calificaciones = this.Lits_Calif_class.getlista();
    this.http_services.preloadEvent$.emit(false);
  }
  ngLogo(value) {
   
    let cadena = 'assets/img/foto-no-disponible.jpg';
    if (value !== '') {
      cadena = environment.url_serve + 'assets/img/logosEmpresas/' + value;
    }
    return cadena;
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
    this.IDValoraTemp = index;
    this.modal_anular = true;
    console.log(this.IDValoraTemp);
  }
  ngChangeValora() {
    if (this.model_motivo === '') {
      return;
    }
    this.modal_anular = false;
    this.http_services.preloadEvent$.emit(true);
    const datos = { valoracion: this.IDValoraTemp, motivo: this.model_motivo };
    this.http.ngChangeValora(datos)
      .subscribe(data => {
        this.model_motivo = '';
        this.IDValoraTemp = 0;
        this.http.NewListado$.emit(true);
      }, error => {
          console.log(error);
          this.http_services.preloadEvent$.emit(false);
      });
    console.log(this.model_motivo);
  }
}
