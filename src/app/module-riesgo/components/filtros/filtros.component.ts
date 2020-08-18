import { Component, OnInit } from '@angular/core';
import { RiesgoServiceService } from '../../../services/riesgo/riesgo-service.service';
import { Serviecokie } from '../../../library/servercokie';
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

  barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  barChartData = [
    { data: [10, 10, 8, 7, 3, 15, 58], hoverBackgroundColor: '#F2143F', backgroundColor: '#F2143F' , label: 'Empeorados', stack: 'Stack 0', },
    { data: [28, 48, 40, 19, 86, 27, 90], hoverBackgroundColor: '#10E0D0', backgroundColor: '#10E0D0', label: 'Mejorados', stack: 'Stack 0', },
    { data: [18, 48, 77, 9, 100, 27, 40], hoverBackgroundColor: '#8F8F8F', backgroundColor: '#8F8F8F', label: 'Mantenidos', stack: 'Stack 0', }];
  public lineChartLegend = true;
  public barChartType = 'bar';
  token = '';
  data_company = [];
  quienes = '';
  tiempo = '';
  subSector ='';
  constructor(
    private http: RiesgoServiceService,
    private serivice_cokie: Serviecokie,
    private rutaActiva: ActivatedRoute,
  ) {
    this.data_company = this.serivice_cokie.getCokie('data_company');
    this.token = this.serivice_cokie.getCokie('token');
    this.rutaActiva.params.subscribe(data => {

      this.quienes = data['como'];
      this.tiempo = data['tiempo'];
      this.ngGetRiesgo();
    });
   }

  ngOnInit(): void {
  }

  ngGetRiesgo() {
    const datos = { IDEmpresa: this.data_company['IDEmpresa'], quienes: this.quienes, tiempo: this.tiempo, subSector:this.subSector,TipoPersonasComo: 'cliente' };
    this.http.ngGetRiesgo(datos)
      .subscribe(data => {
        this.barChartLabels = data['response']['result']['Riesgo']['graficageneral']['labels'];
        console.log(data['response']['result']['Riesgo']['graficageneral']);
        this.barChartData[0]['data'] = data['response']['result']['Riesgo']['graficageneral']['datas'][0]['data_empeorado'];
        this.barChartData[1]['data'] = data['response']['result']['Riesgo']['graficageneral']['datas'][0]['data_mejorado'];
        this.barChartData[2]['data'] = data['response']['result']['Riesgo']['graficageneral']['datas'][0]['data_mantendio'];
        console.log(this.barChartData[0]['data']);
      }, error => {
        console.log(error);
      });
  }

}
