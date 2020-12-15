import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';

import { Serviecokie } from '../../../../library/servercokie';
import { RealizadasServiceService } from '../../../../services/realizadas/realizadas-service.service';
@Component({
  selector: 'app-filtrosq',
  templateUrl: './filtrosq.component.html',
  styleUrls: ['./filtrosq.component.scss']
})
export class FiltrosqComponent implements OnInit {
  para: string;
  tiempo: string;
  data_company: [];
  token = '';
  text = '';
  data_filtros = {
    Ifechainicio: '',
    Ifechafin: '',
    Tipo: '',
    empresabuscada: '',
    estatus: '',
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
    private rutaActiva: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    private cookieservices: Serviecokie,
    private http: RealizadasServiceService
  ) {
    this.token = this.cookieservices.getCokie('token');
    this.data_company = this.cookieservices.getCokie('data_company');
    this._adapter.setLocale('es');
    this.rutaActiva.params.subscribe(data => {

      this.para = data['para'];
      this.ngList();
    });
  }
  ngOnInit(): void { 
    //estatus,Ifechainicio, Ifechafin, empresabuscada
  }
  ngList(){
    if (this.para==='cliente') {
      this.text = 'Clientes';
    } else if (this.para === 'proveedor') {
      this.text = 'Proveedores';
    }
    const array =
    {
      tipo: this.para,
      IDEmpresa: this.data_company['IDEmpresa'],
      Ifechainicio: this.data_filtros.Ifechainicio,
      Ifechafin: this.data_filtros.Ifechafin,
      empresabuscada: this.data_filtros.empresabuscada,
      estatus: this.data_filtros.estatus,
    };
    this.http.ngGetdata(array)
      .subscribe(data => {
        this.lis_clientes = data['response']['result']['lista'];
        this.http.Listacalificaciones$.emit(data['response']['result']['calificaciones']);
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
  addEvent(event, index) {
    let dia = '';
    let mes = '';
    (index.value._i.date < 10) ? dia = '0' + index.value._i.date : dia = index.value._i.date;
    (index.value._i.month < 9) ? mes = '0' + (index.value._i.month + 1) : mes = (index.value._i.month + 1);
    if (event === 'inicio') {
      this.data_filtros.Ifechainicio = index.value._i.year + '-' + mes + "-" + dia;
    } else {
      this.data_filtros.Ifechafin = index.value._i.year + '-' + mes + "-" + dia;
    }
  }
  ngFiltrar() {
    console.log(this.data_filtros);
    const array =
    {
      tipo: this.para,
      IDEmpresa: this.data_company['IDEmpresa'],
      Ifechainicio: this.data_filtros.Ifechainicio,
      Ifechafin: this.data_filtros.Ifechafin,
      empresabuscada: this.data_filtros.empresabuscada,
      estatus: this.data_filtros.estatus,
    };
  
    this.http.ngGetdata(array)
      .subscribe(data => {
        
        this.http.Listacalificaciones$.emit(data['response']['result']['calificaciones']);
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
  ngClearFiltros() {
    this.data_filtros = {
      Ifechainicio: '',
      Ifechafin: '',
      Tipo: '',
      empresabuscada: '',
      estatus: '',
    };
    
    console.log(this.data_filtros);
  }
}
