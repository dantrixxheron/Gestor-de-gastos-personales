import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importar Chart y registerables

Chart.register(...registerables); // Registrar todos los componentes necesarios

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {
  totalGastos: number;
  totalIngresos: number;

  constructor() {
    this.totalGastos = 0;
    this.totalIngresos = 0;
  }

  ngOnInit() {
    this.generarDatosRandom();
    this.crearGraficos();
  }

  generarDatosRandom() {
    // Generación de datos aleatorios para gastos e ingresos
    this.totalGastos = Math.floor(Math.random() * 1000) + 500; // Gastos entre 500 y 1500
    this.totalIngresos = Math.floor(Math.random() * 1000) + 1000; // Ingresos entre 1000 y 2000
  }

  crearGraficos() {
    const ctxGastosPorCategoria = (document.getElementById('gastosPorCategoria') as HTMLCanvasElement)?.getContext('2d');
    const ctxGastosPorMes = (document.getElementById('gastosPorMes') as HTMLCanvasElement)?.getContext('2d');
    const ctxComparacion = (document.getElementById('comparacionIngresosGastos') as HTMLCanvasElement)?.getContext('2d');

    // Gastos por categoría
    if (ctxGastosPorCategoria) {
      new Chart(ctxGastosPorCategoria, {
        type: 'bar',
        data: {
          labels: ['Comida', 'Transporte', 'Entretenimiento', 'Salud', 'Otros'],
          datasets: [{
            label: 'Gastos',
            data: [120, 90, 300, 250, 150],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    if (ctxGastosPorMes) {
      new Chart(ctxGastosPorMes, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Gastos',
            data: [500, 700, 400, 600, 300, 900, 800],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    if (ctxComparacion) {
      new Chart(ctxComparacion, {
        type: 'doughnut',
        data: {
          labels: ['Ingresos', 'Gastos'],
          datasets: [{
            label: 'Comparación',
            data: [this.totalIngresos, this.totalGastos],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }]
        }
      });
    }
  }
}
