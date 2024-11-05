import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NavController } from '@ionic/angular';

Chart.register(...registerables);

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {
  totalGastos: number = 0;
  totalIngresos: number = 0;
  gastosPorMes: number[] = Array(12).fill(0);  // Inicializa gastos por mes
  gastosPorCategoria: { [categoria: string]: number } = {};
  categorias: string[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.cargarDatos();
    this.crearGraficos();
  }

  goBack() {
    this.navCtrl.back();
  }

  cargarDatos() {
    // Leer datos del localStorage
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    const ingresos = JSON.parse(localStorage.getItem('ingresos') || '[]');
    this.categorias = JSON.parse(localStorage.getItem('categorias') || '[]');

    this.totalGastos = parseFloat(localStorage.getItem('totalGastos') || '0');
    this.totalIngresos = parseFloat(localStorage.getItem('totalIngresos') || '0');

    // Confirmar estructura en consola
    console.log("Datos de gastos cargados:", gastos);
    console.log("Categorías disponibles:", this.categorias);

    // Procesar gastos para gráficos
    gastos.forEach((gasto: any) => {
      const { categoria, monto, fecha } = gasto;
      const mes = new Date(fecha).getMonth();
      const montoNumerico = parseFloat(monto);

      if (isNaN(montoNumerico)) {
        console.log("Gasto con monto inválido:", gasto);
        return;
      }

      // Acumular por mes y por categoría
      this.gastosPorMes[mes] += montoNumerico;

      if (!this.gastosPorCategoria[categoria]) {
        this.gastosPorCategoria[categoria] = 0;
      }
      this.gastosPorCategoria[categoria] += montoNumerico;
    });

    // Revisar valores después de procesamiento
    console.log("Total gastos por mes:", this.gastosPorMes);
    console.log("Total gastos por categoría:", this.gastosPorCategoria);
  }

  crearGraficos() {
    const ctxGastosPorCategoria = (document.getElementById('gastosPorCategoria') as HTMLCanvasElement)?.getContext('2d');
    const ctxGastosPorMes = (document.getElementById('gastosPorMes') as HTMLCanvasElement)?.getContext('2d');
    const ctxComparacion = (document.getElementById('comparacionIngresosGastos') as HTMLCanvasElement)?.getContext('2d');

    // Gráfico de Gastos por Categoría
    if (ctxGastosPorCategoria) {
      new Chart(ctxGastosPorCategoria, {
        type: 'bar',
        data: {
          labels: this.categorias,
          datasets: [{
            label: 'Gastos por Categoría',
            data: this.categorias.map(cat => this.gastosPorCategoria[cat] || 0),
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

    // Gráfico de Gastos por Mes
    if (ctxGastosPorMes) {
      new Chart(ctxGastosPorMes, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Gastos por Mes',
            data: this.gastosPorMes,
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

    // Gráfico de Comparación Ingresos-Gastos
    if (ctxComparacion) {
      new Chart(ctxComparacion, {
        type: 'doughnut',
        data: {
          labels: ['Ingresos', 'Gastos'],
          datasets: [{
            label: 'Comparación Ingresos-Gastos',
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
