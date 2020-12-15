import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Serviecokie } from '../../../library/servercokie';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { ImgenServiceService } from '../../../services/imagen_company/imgen-service.service';
import { ListCategoria } from '../../class/list_categoria';
import { EventsServiceService } from '../../../services/events-service.service';
import { Categoria } from '../../class/format';

@Component({
  selector: 'app-graficosdetails',
  templateUrl: './graficosdetails.component.html',
  styleUrls: ['./graficosdetails.component.scss']
})
export class GraficosdetailsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  private data_user = [];
  private data_company = [];
  list_Calidad = new ListCategoria();
  list_Sanidad = new ListCategoria();
  list_Sociambiental = new ListCategoria();
  list_Complimineto = new ListCategoria();
  list_Oferta = new ListCategoria();
  text = '';
  ListCalidad: any[] = [];
  ListCumplimiento: Categoria[] = [];
  ListSanidad: Categoria[] = [];
  ListSociambiental: Categoria[] = [];
  ListOferta: Categoria[] = [];
  token = '';
  submitted = false;
  form_filtro: FormGroup;
  como: string;
  tiempo: string;
  Categorias = {
    Calidad: true,
    Cumplimiento: true,
    Oferta: true,
    Sanidad: true,
    Sociambiental: true
  };
  MediaGeneral = 0;
  filtro = {
    Categoria: '',
    Tipo: ''
  };
  fecha = new Date();
  text_fecha = 'Información actualizada a la fecha: ' + this.fecha.getDate() +"/"+ (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear();

  public lineChartOptions: any = {

    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'rgba(0,0,0,1)',
          fontFamily: 'w-r'
        },
        gridLines: {
          color: '#d3d3d3'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'rgba(0,0,0,1)',
          fontFamily: 'w-r'
        },
        gridLines: {
          color: '#d3d3d3'
        }
      }],
    },
    responsive: true,
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        // This more specific font property overrides the global property
        fontColor: '#000',
        fontFamily: 'w-r'
      }
    }
  };
  public barChartOption: any = {
    responsive: true,
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        staked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }
  public lineChartColors: Array<any> = [
    { // grey
      fill: false,
      borderColor: 'rgba(255, 133, 27, 1)',
      pointBackgroundColor: 'rgba(255, 133, 27, 1)',
      pointBorderColor: 'rgba(255, 133, 27, 1)',
      pointHoverBackgroundColor: 'rgba(255, 133, 27, 1)',
      pointHoverBorderColor: 'rgba(255, 133, 27, 1)'
    },
    { // grey
      fill: false,
      borderColor: '#1476FC',
      pointBackgroundColor: '#1476FC',
      pointBorderColor: '#1476FC',
      pointHoverBackgroundColor: '#1476FC',
      pointHoverBorderColor: '#1476FC'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public barChartType = 'bar';
  constructor(
    private htt_service: EventsServiceService,
    private http: ImgenServiceService,
    private formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private serviceCookie: Serviecokie
  ) {
    this.data_user = this.serviceCookie.getCokie('data_user');
    this.token = this.serviceCookie.getCokie('token');
    this.data_company = this.serviceCookie.getCokie('data_company');
    
    this.rutaActiva.params.subscribe(data => {

      this.como = data['como'];
      this.tiempo = data['tiempo'];
      if (data['quality']=== undefined) {
        this.filtro.Categoria = 'all';
      } else {
        this.filtro.Categoria = data['quality'];
      
      }
      console.log(data['quality']);
      this.ngOnInit();
    });
   }
  get form_get() {
    return this.form_filtro.controls;
  }
  ngOnInit(): void {
    const array = {
      IDEmpresa: this.data_company['IDEmpresa'],
      fecha: this.tiempo,
      tipo: this.como
    };
    this.htt_service.preloadEvent$.emit(true);
    this.http.ngDetalles(array)
      .subscribe(data => {
        console.log(data);
        this.list_Calidad.limpiarlista();
        this.list_Complimineto.limpiarlista();
        this.list_Oferta.limpiarlista();
        this.list_Sanidad.limpiarlista();
        this.list_Sociambiental.limpiarlista();
        this.text = data['response']['result']['imagen']['Periodo'];
        this.MediaGeneral = data['response']['result']['imagen']['MediaGenral'];
        data['response']['result']['imagen']['listCalidad'].forEach(item => {
          this.list_Calidad.add_medicamento(item);
        });
        data['response']['result']['imagen']['listCumplimiento'].forEach(item => {
          this.list_Complimineto.add_medicamento(item);
        });
        data['response']['result']['imagen']['listSanidad'].forEach(item => {
          this.list_Sanidad.add_medicamento(item);
        });
        data['response']['result']['imagen']['listSociambiental'].forEach(item => {
          this.list_Sociambiental.add_medicamento(item);
        });

        if (this.como === 'proveedor') {
          data['response']['result']['imagen']['listOferta'].forEach(item => {
            this.list_Oferta.add_medicamento(item);
          });
          this.ListOferta = this.list_Oferta.getlista();
        }
        this.ListCalidad = this.list_Calidad.getlista();
        this.ListCumplimiento = this.list_Complimineto.getlista();
        this.ListSanidad = this.list_Sociambiental.getlista();
        this.ListSociambiental = this.list_Sociambiental.getlista();
        this.filter();
      }, error => {
          this.htt_service.preloadEvent$.emit(false);
          console.log(error);
      }, () => {
          this.htt_service.preloadEvent$.emit(false);
      });
  }
  filter() {
    console.log(this.filtro);
    if (this.filtro.Categoria !== '' ) {
      switch (this.filtro.Categoria) {
        case 'all':
          this.Categorias.Calidad = true;
          this.Categorias.Cumplimiento = true;
          this.Categorias.Oferta = true;
          this.Categorias.Sociambiental = true;
          this.Categorias.Sanidad = true;
          break;
        case 'Cumplimiento':
          this.Categorias.Calidad = false;
          this.Categorias.Cumplimiento = true;
          this.Categorias.Oferta = false;
          this.Categorias.Sociambiental = false;
          this.Categorias.Sanidad = false;
          break;
        case 'Calidad':
          this.Categorias.Calidad = true;
          this.Categorias.Cumplimiento = false;
          this.Categorias.Oferta = false;
          this.Categorias.Sociambiental = false;
          this.Categorias.Sanidad = false;
          break;
        case 'Sanidad':
          this.Categorias.Calidad = false;
          this.Categorias.Cumplimiento = false;
          this.Categorias.Oferta = false;
          this.Categorias.Sociambiental = false;
          this.Categorias.Sanidad = true;
          break;
        case 'Sociambiental':
          this.Categorias.Calidad = false;
          this.Categorias.Cumplimiento = false;
          this.Categorias.Oferta = false;
          this.Categorias.Sociambiental = true;
          this.Categorias.Sanidad = false;
          break;
        case 'Oferta':
          this.Categorias.Sanidad = false;
          this.Categorias.Sociambiental = false;
          this.Categorias.Calidad = false;
          this.Categorias.Cumplimiento = false;
          this.Categorias.Oferta = true;
          break;
      }
    }
    switch (this.filtro.Tipo) {
      case 'all':
      case '':
        this.ListCalidad = this.list_Calidad.getlista();
        this.ListCumplimiento = this.list_Complimineto.getlista();
        this.ListSanidad = this.list_Sociambiental.getlista();
        this.ListSociambiental = this.list_Sociambiental.getlista();
        this.ListOferta = this.list_Oferta.getlista();
        break;
      case 'menor':
        this.ListCalidad = this.list_Calidad.filtro('baja');
        this.ListCumplimiento = this.list_Complimineto.filtro('baja');
        this.ListSanidad = this.list_Sociambiental.filtro('baja');
        this.ListSociambiental = this.list_Sociambiental.filtro('baja');

        this.ListOferta = this.list_Calidad.filtro('baja');
        break;
      case 'medio':
        this.ListSanidad = this.list_Sociambiental.filtro('media');
        this.ListSociambiental = this.list_Sociambiental.filtro('media');
        this.ListCalidad = this.list_Calidad.filtro('media');
        this.ListCumplimiento = this.list_Complimineto.filtro('media');
        this.ListOferta = this.list_Calidad.filtro('media');
        break;
      case 'alto':
        this.ListSanidad = this.list_Sociambiental.filtro('mayor');
        this.ListSociambiental = this.list_Sociambiental.filtro('mayor');
        this.ListCalidad = this.list_Calidad.filtro('mayor');
        this.ListCumplimiento = this.list_Complimineto.filtro('mayor');
        this.ListOferta = this.list_Calidad.filtro('mayor');
        break;
    }
    console.log(this.filtro);
  }
}
