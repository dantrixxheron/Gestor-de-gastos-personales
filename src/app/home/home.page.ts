import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  totalIngresos: number = 0;
  totalGastos: number = 0;
  saldo: number = 0;

  constructor() {}

  ngOnInit() {
    this.cargarResumenFinanciero();
  }

  ionViewWillEnter() {
    this.cargarResumenFinanciero();
  }

  cargarResumenFinanciero() {
    // Leer los valores de ingresos y gastos desde localStorage
    const ingresos = localStorage.getItem('totalIngresos');
    const gastos = localStorage.getItem('totalGastos');

    // Convertir los valores a número y asignarlos a las variables
    this.totalIngresos = ingresos ? parseFloat(ingresos) : 0;
    this.totalGastos = gastos ? parseFloat(gastos) : 0;

    // Calcular el saldo como la diferencia entre ingresos y gastos
    this.saldo = this.totalIngresos - this.totalGastos;

    // Opcional: almacenar el saldo actualizado en localStorage para referencia
    localStorage.setItem('saldo', this.saldo.toString());
  }
}
