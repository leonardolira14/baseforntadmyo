import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsServiceService } from '../../../../services/events-service.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

import { VisitasServiceService } from '../../../../services/data_company/visitas-service.service';
import { Serviecokie } from '../../../../library/servercokie';


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {
  activo_mes = true;
  activo_mes_anio = false;
  data_user = [];
  @ViewChild('chart') chart: ChartComponent;
  fecha = new Date();
  text = this.fecha.getDay() + ' ' + this.fecha.getFullYear();
  totales = 0;
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Clientes',
        data: [0, 0]
      },
      {
        name: 'Proveedores',
        data: [0, 0]
      },
      {
        name: 'Otras',
        data: [0, 0]
      },
      {

        name: 'Anonimas',
        data: [0, 0]

      },

    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
  };
  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public lineChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'rgba(255,255,255,0.8)'
        },
        gridLines: {
          color: 'rgba(255,255,255,0.5)'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'rgba(255,255,255,0.8)'
        },
        gridLines: {
          color: 'rgba(255,255,255,0.5)'
        }
      }],
    },
    responsive: true,
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        // This more specific font property overrides the global property
        fontColor: '#fff'
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
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartData: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: '2020'
    },
    {
      data: [15, 50, 7, 42, 20, 8, 15, 20, 30, 10, 25, 0],
      label: '201gh9'
    }

  ];
  public token = '';
  public data_empresa = [];
  constructor(
    private http: VisitasServiceService,
    private http_services: EventsServiceService,
    private cookieservices: Serviecokie
  ) {
    this.http_services.preloadEvent$.emit(true);
    this.token = this.cookieservices.getCokie('token');
    this.data_empresa = this.cookieservices.getCokie('data_company');
   }
  ngOnInit(): void {

    this.getAll('M');
  }

  getAll(mes) {
    if (mes === 'M') {
      this.activo_mes = true;
      this.activo_mes_anio = false;
    } else {
      this.activo_mes = false;
      this.activo_mes_anio = true;
    }
    const datos = mes;
    this.http_services.preloadEvent$.emit(true);
    this.http.service_getall(datos)
      .subscribe(data => {
        this.http_services.preloadEvent$.emit(false);
       
        this.text = data['periodo'];
        this.totales = data['total'];
        this.generaGrafica1(data['Grafica1'][0]['dataCliente'],data['Grafica1'][0]['dataProveedor'],data['Grafica1'][0]['dataOtras'],data['label']);
        this.lineChartData[0].label =data['Grafica2'][0]['Anio1'];
        this.lineChartData[1].label =data['Grafica2'][0]['Anio2'];

        this.lineChartData[0].data =data['Grafica2'][0]['datA'];
        this.lineChartData[1].data =data['Grafica2'][0]['datP'];
      }, (error: HttpErrorResponse) => {
        this.http_services.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
        console.log(error.error, error.status);
      }, () => this.http_services.preloadEvent$.emit(false));
  }

  generaGrafica1(dataClientes, dataProveedores, dataOtras, periodo) {
    this.chartOptions = {
      series: [
        {
          name: 'Clientes',
          data: dataClientes,
        },
        {
          name: 'Proveedores',
          data: dataProveedores
        },
        {
          name: 'Otras',
          data: dataOtras
        },

      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: [ '#707070', '#1476FC', '#FF851B'],

      },
      title: {
        text: 'Perfil de Visitantes'
      },
      xaxis: {
        categories: periodo,

      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {

        theme: 'dark'
      },
      fill: {
        colors: ['#707070', '#1476FC', '#FF851B'],
        opacity: 1
      },
      legend: {
        markers: {
          width: 50,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: [ '#707070', '#1476FC', '#FF851B'],
          radius: 12
        },
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 40
      }
    };
    console.log(this.chartOptions);
  }
  generaGrafica2(Serie1, Serie2, Anio1, Anio2) {
    this.lineChartData[0]['data'] = Serie1;
    this.lineChartData[0]['name'] = Anio1;
    this.lineChartData[1]['data'] = Serie2;
    this.lineChartData[1]['name'] = Anio2;
  }

}
