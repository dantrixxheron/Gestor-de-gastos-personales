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

  cargarResumenFinanciero() {
    // Obtén los datos almacenados en el localStorage
    const ingresos = localStorage.getItem('totalIngresos');
    const gastos = localStorage.getItem('totalGastos');
    const saldo = localStorage.getItem('saldo');

    // Convierte los datos a número y asigna a las variables
    this.totalIngresos = ingresos ? parseFloat(ingresos) : 0;
    this.totalGastos = gastos ? parseFloat(gastos) : 0;
    this.saldo = saldo ? parseFloat(saldo) : this.totalIngresos - this.totalGastos;
  }
}
