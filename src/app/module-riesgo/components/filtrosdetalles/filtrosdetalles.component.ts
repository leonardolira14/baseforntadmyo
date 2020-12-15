import { Component, OnInit } from '@angular/core';
import { RiesgoServiceService } from '../../../services/riesgo/riesgo-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { GirosServiceService } from '../../../services/data_company/giros-service.service';
import { EventsServiceService } from '../../../services/events-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filtrosdetalles',
  templateUrl: './filtrosdetalles.component.html',
  styleUrls: ['./filtrosdetalles.component.scss']
})
export class FiltrosdetallesComponent implements OnInit {
  filtro = {
    Categoria: 'all',
    subsector: '',
    sector: ''
  };
  Categorias = {
    Calidad: true,
    Cumplimiento: true,
    Oferta: true,
    Socioambiental: true,
    Sanidad: true
  };
  list_subsector = [];
  public barChartType = 'bar';
  public lineChartLegend = true;
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
  };
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
  public lineChartType = 'line';
  quienes = '';
  tiempo = '';
  token = '';
  data_company = [];
  subSector = '';
  sector = [];
  datos_calidad = [];
  datos_cumplimiento = [];
  datos_oferta = [];
  datos_socioambiental = [];
  datos_sanidad = [];

  public comoQue = 'cliente';
  constructor(
    private http_services: EventsServiceService,
    private rutaActiva: ActivatedRoute,
    private serivice_cokie: Serviecokie,
    private http_giros: GirosServiceService,
    private http: RiesgoServiceService,
  ) {
    this.data_company = this.serivice_cokie.getCokie('data_company');
    this.token = this.serivice_cokie.getCokie('token');
    this.rutaActiva.params.subscribe(data => {

      this.quienes = data['como'];
      this.tiempo = data['tiempo'];
      this.ngGetRiesgo();
    });
    this.http.TipoCliente$.subscribe(data => {
      this.quienes = data['quienes'];
      this.comoQue = data['comoque'];
      this.ngGetRiesgo();
    });
   }

  ngOnInit(): void {
    this.http_giros.getAllGiiro()
      .subscribe(data => {
        this.sector = data['response']['result'];

      });
  }
  ngGetRiesgo() {
    this.http_services.preloadEvent$.emit(true);
    const datos = {
      IDEmpresa: this.data_company['IDEmpresa'],
      Quienes: this.quienes,
      Periodo: this.tiempo,
      IDSector: this.subSector,
      ComoQue: this.comoQue
    };
    this.http.ngGetDetalleRiesgo(datos)
      .subscribe(data => {
        console.log(data);
        this.datos_calidad = data['response']['datos']['calidad'];
        this.datos_cumplimiento = data['response']['datos']['cumplimiento'];
        this.datos_oferta = data['response']['datos']['oferta'];
        this.datos_socioambiental = data['response']['datos']['socioambiental'];
        this.datos_sanidad = data['response']['datos']['sanidad'];
        this.http_services.preloadEvent$.emit(false);
      }, error => {
          this.http_services.preloadEvent$.emit(false);
          console.log(error);
      });
  }
  ngGetSubSector(index) {
    this.http_services.preloadEvent$.emit(true);
    console.log(index);
    this.http_giros.getallsubsector(index)
      .subscribe(data => {
        this.list_subsector = data['response']['result'];
        console.log(data);
        this.http_services.preloadEvent$.emit(false);
      }, error => {
        this.http_services.preloadEvent$.emit(false);
        console.log(error);
      });
  }
  filter() {
    console.log(this.filtro);
    if (this.filtro.Categoria !== '') {
      switch (this.filtro.Categoria) {
        case 'all':
          this.Categorias.Calidad = true;
          this.Categorias.Cumplimiento = true;
          this.Categorias.Oferta = true;
          break;
        case 'Cumplimiento':
          this.Categorias.Calidad = false;
          this.Categorias.Cumplimiento = true;
          this.Categorias.Oferta = false;
          break;
        case 'Calidad':
          this.Categorias.Calidad = true;
          this.Categorias.Cumplimiento = false;
          this.Categorias.Oferta = false;
          break;
        case 'Oferta':
          this.Categorias.Calidad = false;
          this.Categorias.Cumplimiento = false;
          this.Categorias.Oferta = true;
          break;
      }
    }
    this.subSector = this.filtro.subsector;
    this.ngGetRiesgo();
    
  }
  clrarfilter() {
    this.filtro = {
      Categoria: 'all',
      subsector: '',
      sector: ''
    };
  }
}
