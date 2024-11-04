import { Component } from '@angular/core';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage {
  monto: number;
  categoria: string;
  fecha: string;
  notas: string;
  gastos: any[] = [];

  constructor() {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }

  agregarGasto() {
    if (this.monto && this.categoria && this.fecha) {
      const nuevoGasto = {
        monto: this.monto,
        categoria: this.categoria,
        fecha: this.fecha,
        notas: this.notas,
      };
      this.gastos.push(nuevoGasto);
      this.limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  eliminarGasto(gasto: any) {
    this.gastos = this.gastos.filter(g => g !== gasto);
  }

  editarGasto(gasto: any) {
    // Lógica para editar el gasto
    this.monto = gasto.monto;
    this.categoria = gasto.categoria;
    this.fecha = gasto.fecha;
    this.notas = gasto.notas;
    this.eliminarGasto(gasto);
  }

  limpiarFormulario() {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }
}
