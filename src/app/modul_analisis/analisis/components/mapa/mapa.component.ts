import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    const ctx: any = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10, 20, 30,15,5,8,9,21,20],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(80, 92, 12, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 90, 15, 12)',
            'rgba(255, 19, 34, 21)',
            'rgba(255, 59, 24, 1)'
          ]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Aceros',
          'Alimentos',
          'Plasticos',
          'Transporte',
          'Cementos',
          'Distribuición',
          'Gran consumo',
          'Maquinaria',
          'otros'
        ],
        
      },
      options: {
        title: {
          display: true,
          text: 'Giros Representados'
        },
        legend: {
          display: true,
          position: 'right',
          align: 'start',
          labels: {
           
          }
        }
      }
    });
  }

}
