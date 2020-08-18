import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { ImgenServiceService} from '../../../services/imagen_company/imgen-service.service';
import { ActivatedRoute } from '@angular/router';
import { Serviecokie } from '../../../library/servercokie';
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  como: string;
  tiempo: string;
  data_company: [];
  token = '';
  data_filtros = {
    FechaInicio: '',
    FechaFin: '',
    Tipo: '',
    cliente: '',
    Estado: '',
  };
  dias_array = [
    { fecha: '', ndia: 9, dia: 'Domingo' },
    { fecha: '', ndia: 3, dia: 'Lunes' },
    { fecha: '', ndia: 4, dia: 'Martes' },
    { fecha: '', ndia: 5, dia: 'Miercoles' },
    { fecha: '', ndia: 6, dia: 'Jueves' },
    { fecha: '', ndia: 7, dia: 'Viernes' },
    { fecha: '', ndia: 8, dia: 'Sabado' }
  ];
  lis_clientes = [];
  constructor(
    private _adapter: DateAdapter<any>,
    private http: ImgenServiceService,
    private rutaActiva: ActivatedRoute,
    private cookieservices: Serviecokie
  ) {
    this.token = this.cookieservices.getCokie('token');
    this.data_company = this.cookieservices.getCokie('data_company');
    this._adapter.setLocale('es');
    this.http.NewListado$.subscribe(data => {
      if (data) {
        this.ngOnInit();
      }
    });
    this.rutaActiva.params.subscribe(data => {

      this.como = data['como'];
      this.tiempo = data['tiempo'];
      this.ngOnInit();
    });
   }

  ngOnInit(): void {
    const array = 
      {
        tipo: this.como,
        tiempo: this.tiempo,
        IDEmpresa: this.data_company['IDEmpresa']
      };
    this.http.ngGetCalif(array)
      .subscribe(data => {
        console.log(data);
        this.lis_clientes = data['response']['result']['lista'];
        this.http.ListCalificaciones$.emit(data['response']['result']['calificaciones']);
      }, error => {
          console.log(error);
      });
  }

  ngFiltrar() {
    console.log(this.data_filtros);
    this.http.Filtros$.emit(this.data_filtros);
  }
  addEvent(event, index) {
    let dia = '';
    let mes = '';
    (index.value._i.date < 10) ? dia = '0' + index.value._i.date : dia = index.value._i.date;
    (index.value._i.month < 9) ? mes = '0' + (index.value._i.month + 1) : mes = (index.value._i.month + 1);
    if (event === 'inicio') {
      this.data_filtros.FechaInicio = index.value._i.year + '-' + mes + "-" + dia;
    } else {
      this.data_filtros.FechaFin = index.value._i.year + '-' + mes + "-" + dia;
    }
  }
  ngClearFiltros() {
    this.data_filtros = {
      FechaInicio: '',
      FechaFin: '',
      Tipo: '',
      cliente: '',
      Estado: '',
    };
    this.http.Filtros$.emit(this.data_filtros);
    console.log(this.data_filtros);
  }

}
