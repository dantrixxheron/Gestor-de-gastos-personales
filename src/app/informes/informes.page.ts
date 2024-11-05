import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js/auto';
import { NavController } from '@ionic/angular';


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
  chartGastosPorCategoria: Chart | null = null;
  chartGastosPorMes: Chart | null = null;
  chartComparacion: Chart | null = null;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.cargarDatos();
    this.crearGraficos();
  }
  ionViewWillEnter() {
    this.cargarDatos();
    this.crearGraficos();
  }

  goBack() {
    this.navCtrl.back();
  }

  cargarDatos() {
    this.resetDatos();
    // Leer datos del localStorage
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    const ingresos = JSON.parse(localStorage.getItem('ingresos') || '[]');
    this.categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
  
    this.totalGastos = parseFloat(localStorage.getItem('totalGastos') || '0');
    this.totalIngresos = parseFloat(localStorage.getItem('totalIngresos') || '0');
  
    gastos.forEach((gasto: any) => {
      const { categoria, monto, fecha } = gasto;
      const mes = new Date(fecha).getMonth();
      const montoNumerico = parseFloat(monto);
    
      // Acumular por mes y por categoría
      this.gastosPorMes[mes] += montoNumerico;
  
      if (!this.gastosPorCategoria[categoria]) {
        this.gastosPorCategoria[categoria] = 0;
      }
      this.gastosPorCategoria[categoria] += montoNumerico;
    });
    this.crearGraficos();
  }

  crearGraficos() {
    this.resetGraficos();

    const ctxGastosPorCategoria = document.getElementById('gastosPorCategoria') as ChartItem;
    const ctxGastosPorMes = document.getElementById('gastosPorMes') as ChartItem;
    const ctxComparacion = document.getElementById('comparacionIngresosGastos') as ChartItem;
  
  // Gráfico de Gastos por Categoría
  if (ctxGastosPorCategoria) {
    if (this.chartGastosPorCategoria) {
      this.chartGastosPorCategoria.data.datasets[0].data = this.categorias.map(cat => this.gastosPorCategoria[cat] || 0);
      this.chartGastosPorCategoria.update();
    } else {
      const config: ChartConfiguration = {
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
      };
      this.chartGastosPorCategoria = new Chart(ctxGastosPorCategoria, config);
    }
  }
  
    // Gráfico de Gastos por Mes
    if (ctxGastosPorMes) {
      if (this.chartGastosPorMes) {
        this.chartGastosPorMes.data.datasets[0].data = this.gastosPorMes;
        this.chartGastosPorMes.update();
      } else {
        this.chartGastosPorMes = new Chart(ctxGastosPorMes, {
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
    }
  
    // Gráfico de Comparación Ingresos-Gastos
if (ctxComparacion) {
  if (this.chartComparacion) {
    this.chartComparacion.data.datasets[0].data = [this.totalIngresos, this.totalGastos];
    this.chartComparacion.update();
  } else {
    const config: ChartConfiguration = {
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
    };
    this.chartComparacion = new Chart(ctxComparacion, config);
  }
}
  }
  resetGraficos() {
    if (this.chartGastosPorCategoria) {
      this.chartGastosPorCategoria.destroy();
      this.chartGastosPorCategoria = null;
    }
    if (this.chartGastosPorMes) {
      this.chartGastosPorMes.destroy();
      this.chartGastosPorMes = null;
    }
    if (this.chartComparacion) {
      this.chartComparacion.destroy();
      this.chartComparacion = null;
    }
  }
  resetDatos() {
    this.totalGastos = 0;
    this.totalIngresos = 0;
    this.gastosPorMes = Array(12).fill(0);
    this.gastosPorCategoria = {};
    this.categorias = [];
  }
}
