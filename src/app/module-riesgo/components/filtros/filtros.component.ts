import { Component, OnInit } from '@angular/core';
import { RiesgoServiceService } from '../../../services/riesgo/riesgo-service.service';
import { Serviecokie } from '../../../library/servercokie';
import { GirosServiceService } from '../../../services/data_company/giros-service.service';
import { EventsServiceService } from '../../../services/events-service.service';
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
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
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
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
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

  barChartLabels = [];
  barChartData = [
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#F2143F', backgroundColor: '#F2143F' , label: 'Empeorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#10E0D0', backgroundColor: '#10E0D0', label: 'Mejorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#8F8F8F', backgroundColor: '#8F8F8F', label: 'SIN DATOS', stack: 'Stack 0', }];
  barChartData_cumplimiento = [
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#F2143F', backgroundColor: '#F2143F', label: 'Empeorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#10E0D0', backgroundColor: '#10E0D0', label: 'Mejorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#8F8F8F', backgroundColor: '#8F8F8F', label: 'SIN DATOS', stack: 'Stack 0', }];
  barChartData_calidad = [
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#F2143F', backgroundColor: '#F2143F', label: 'Empeorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#10E0D0', backgroundColor: '#10E0D0', label: 'Mejorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#8F8F8F', backgroundColor: '#8F8F8F', label: 'SIN DATOS', stack: 'Stack 0', }];
  barChartData_oferta = [
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#F2143F', backgroundColor: '#F2143F', label: 'Empeorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#10E0D0', backgroundColor: '#10E0D0', label: 'Mejorados', stack: 'Stack 0', },
    { data: [0, 0, 0, 0, 0, 0, 0], hoverBackgroundColor: '#8F8F8F', backgroundColor: '#8F8F8F', label: 'SIN DATOS', stack: 'Stack 0', }];

  public lineChartLegend = true;
  public barChartType = 'bar';
  token = '';
  data_company = [];
  quienes = '';
  tiempo = '';
  subSector = '';
  list_subsector = [];
  sector = [];
  sector_index = '';
  public comoQue = 'cliente';
  periodo = '';
  NumEmpeorados = 0;
  NumMejorados = 0;
  NumSD = 0;
  public porcentajes = {'Oferta': 0, 'Cumplimiento': 0, 'Calidad': 0};
  constructor(
    private http_giros: GirosServiceService,
    private http: RiesgoServiceService,
    private serivice_cokie: Serviecokie,
    private rutaActiva: ActivatedRoute,
    private http_services: EventsServiceService
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
      IDGiro: this.subSector,
      comoQue: this.comoQue
    };
    console.log(datos);

    this.http.ngGetRiesgo(datos)
      .subscribe(data => {
        console.log(data);
        const graficas = data['response']['graficas'];
        const labels = data['response']['labels'];
        this.porcentajes = data['response']['porcentajes'];
        this.barChartLabels = labels;
        // console.log(data['response']['result']['Riesgo']['graficageneral']);
        this.barChartData[0]['data'] = graficas['General']['Empeorado'];
        this.barChartData[1]['data'] = graficas['General']['Mejorados'];
        this.barChartData[2]['data'] = graficas['General']['SD'];

        this.barChartData_calidad[0]['data'] = graficas['Calidad']['Empeorado'];
        this.barChartData_calidad[1]['data'] = graficas['Calidad']['Mejorados'];
        this.barChartData_calidad[2]['data'] = graficas['Calidad']['SD'];

        this.barChartData_cumplimiento[0]['data'] = graficas['Cumplimiento']['Empeorado'];
        this.barChartData_cumplimiento[1]['data'] = graficas['Cumplimiento']['Mejorados'];
        this.barChartData_cumplimiento[2]['data'] = graficas['Cumplimiento']['SD'];


        this.barChartData_oferta[0]['data'] = graficas['Oferta']['Empeorado'];
        this.barChartData_oferta[1]['data'] = graficas['Oferta']['Mejorados'];
        this.barChartData_oferta[2]['data'] = graficas['Oferta']['SD'];

        this.periodo = data['response']['periodo'];
        this.NumEmpeorados = data['response']['NumEmpeorados'];
        this.NumMejorados = data['response']['NumMejorados'];
        this.NumSD = data['response']['NumSD'];
        this.http_services.preloadEvent$.emit(false);
      }, error => {
          this.http_services.preloadEvent$.emit(false);
          console.log(error);
      });

  }
  ngGetSubSector(index) {
    console.log(index);
    this.http_giros.getallsubsector(index)
      .subscribe(data => {
        this.list_subsector = data['response']['result'];
        console.log(data);
      });
  }

}
