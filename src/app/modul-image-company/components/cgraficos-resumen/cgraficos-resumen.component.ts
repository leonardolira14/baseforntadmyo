import { Component, OnInit } from '@angular/core';
import { ImgenServiceService } from '../../../services/imagen_company/imgen-service.service';
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
import { HttpErrorResponse } from '@angular/common/http';
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
  selector: 'app-cgraficos-resumen',
  templateUrl: './cgraficos-resumen.component.html',
  styleUrls: ['./cgraficos-resumen.component.scss']
})
export class CgraficosResumenComponent implements OnInit {
  IDEmpresa= '';
  Tiempo= '';
  Como='';
  public lineChartData: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }
    ,
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  lineChartDataGeneral: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    },
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  lineChartDataCalidad: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    },
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  lineChartDataCumplimiento: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    },
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  lineChartDataSanidad: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    },
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  lineChartDataSocioambiental: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    },
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  lineChartDataOferta: Array<any> = [
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    },
    {
      data: [5, 38, 20, 30, 14],
      label: ''
    }

  ];
  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
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
  public lineChartLegend = true;
  public lineChartType = 'line';
   
  numero_total_calificaciones = 0;
  calificacion_media_general = 0;
  calificacion_media_calidad = 0;
  calificacion_media_cumplimiento = 0;
  calificacion_media_sanidad = 0;
  calificacion_media_socioambiental = 0;
  calificacion_media_oferta = 0;
  text_leyenda = '';
  constructor(
    private http: ImgenServiceService,
    private http_service: EventsServiceService
  ) {
    this.http_service.IDEmpresa$.subscribe(data => {
      console.log(data);
      this.Tiempo = data[0]['tiempo'];
      this.Como = data[0]['como'];
      
      this.ngGenera();
    });
   }
  ngGenera() {
    this.http_service.preloadEvent$.emit(true);
    const datos = {fecha: this.Tiempo, tipo: this.Como };
    this.http.ngGetImagen(this.Tiempo,this.Como)
      .subscribe(data => {
        
       
        this.http_service.periodoImagen$.emit( data['periodo']);
        this.text_leyenda = data['periodo'];
        this.numero_total_calificaciones = data['numeroCalificaciones'];

        this.lineChartLabels = data['labelGraficos'];

        this.lineChartData[1]['data'] = data['dataGraphicNumeroEvolucion']['data_actual'];
        this.lineChartData[0]['data'] = data['dataGraphicNumeroEvolucion']['data_pasado'];

        this.lineChartData[1]['label'] =data['dataGraphicNumeroEvolucion']['Periodo_Actual'];
        this.lineChartData[0]['label'] = data['dataGraphicNumeroEvolucion']['Periodo_Pasado'];

        
        this.calificacion_media_general = data['MediaGeneral'];
        this.calificacion_media_calidad = data['MediaCalidad'];
        this.calificacion_media_cumplimiento = data['MediaCumplimiento'];
        this.calificacion_media_sanidad = data['MediaSanidad'];
        this.calificacion_media_socioambiental = data['MediaSocioambiental'];

        this.lineChartDataCalidad[1]['data'] = data['dataGraphicMediaEvolucionCaldiad']['data_actual'];
        this.lineChartDataCalidad[0]['data'] = data['dataGraphicMediaEvolucionCaldiad']['data_pasado'];
        this.lineChartDataCalidad[1]['label'] = data['dataGraphicMediaEvolucionCaldiad']['Periodo_Actual'];
        this.lineChartDataCalidad[0]['label'] = data['dataGraphicMediaEvolucionCaldiad']['Periodo_Pasado'];

        this.lineChartDataCumplimiento[1]['data'] = data['dataGraphicMediaEvolucioncumplimiento']['data_actual'];
        this.lineChartDataCumplimiento[0]['data'] = data['dataGraphicMediaEvolucioncumplimiento']['data_pasado'];

        this.lineChartDataCumplimiento[1]['label'] = data['dataGraphicMediaEvolucioncumplimiento']['Periodo_Actual'];
        this.lineChartDataCumplimiento[0]['label'] = data['dataGraphicMediaEvolucioncumplimiento']['Periodo_Pasado'];


      

        this.lineChartDataSanidad [1]['data'] =data['dataGraphicMediaEvolucionSanidad']['data_actual'];
        this.lineChartDataSanidad[0]['data'] = data['dataGraphicMediaEvolucionSanidad']['data_pasado'];

        this.lineChartDataSanidad[1]['label'] = data['dataGraphicMediaEvolucionSanidad']['Periodo_Actual'];
        this.lineChartDataSanidad[0]['label'] = data['dataGraphicMediaEvolucionSanidad']['Periodo_Pasado'];

        this.lineChartDataSocioambiental[1]['label'] = data['dataGraphicMediaEvolucionSocioambiental']['Periodo_Actual'];
        this.lineChartDataSocioambiental[0]['label'] =  data['dataGraphicMediaEvolucionSocioambiental']['Periodo_Pasado'];
       

        this.lineChartDataSocioambiental[1]['data'] = data['dataGraphicMediaEvolucionSocioambiental']['data_actual'];
        this.lineChartDataSocioambiental[0]['data'] = data['dataGraphicMediaEvolucionSocioambiental']['data_pasado'];
        
        this.lineChartDataGeneral[1]['data'] = data['dataGraphicMediaEvolucionGeneral']['data_actual'];
        this.lineChartDataGeneral[0]['data'] = data['dataGraphicMediaEvolucionGeneral']['data_pasado'];
        this.lineChartDataGeneral[1]['label'] = data['dataGraphicMediaEvolucionGeneral']['Periodo_Actual'];
        this.lineChartDataGeneral[0]['label'] = data['dataGraphicMediaEvolucionGeneral']['Periodo_Pasado'];
      
        if (this.Como === 'proveedor') {
          this.lineChartDataOferta[1]['data'] =  data['dataGraphicMediaEvolucionSanidad']['data_actual'];
          this.lineChartDataOferta[0]['data'] = data['dataGraphicMediaEvolucionSanidad']['data_pasado'];
          this.lineChartDataOferta[1]['label'] = data['dataGraphicMediaEvolucioncumplimiento']['Periodo_Actual'];
          this.lineChartDataOferta[0]['label'] = data['dataGraphicMediaEvolucioncumplimiento']['Periodo_Pasado'];
          this.calificacion_media_oferta = data['MediaOferta'];
          
        }
        this.http_service.preloadEvent$.emit(false)

      }, (error: HttpErrorResponse) => {
        this.http_service.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      });
   }
  ngOnInit(): void {
    
  }

}
