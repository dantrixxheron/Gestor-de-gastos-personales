import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {
  monto: number;
  fuente: string;
  fecha: string;
  ingresos: any[] = [];

  constructor() {
    this.monto = 0;
    this.fuente = '';
    this.fecha = '';
  }

  ngOnInit() {
    this.cargarIngresos();
  }

  agregarIngreso() {
    if (this.monto && this.fuente && this.fecha) {
      const nuevoIngreso = {
        monto: this.monto,
        fuente: this.fuente,
        fecha: this.fecha,
      };
      this.ingresos.push(nuevoIngreso);
      this.guardarIngresos();
      this.limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  eliminarIngreso(ingreso : any) {
    this.ingresos = this.ingresos.filter(i => i !== ingreso);
    this.guardarIngresos();
  }

  editarIngreso(ingreso : any) {
    // Lógica para editar el ingreso
    this.monto = ingreso.monto;
    this.fuente = ingreso.fuente;
    this.fecha = ingreso.fecha;
    this.eliminarIngreso(ingreso);
  }

  limpiarFormulario() {
    this.monto = 0;
    this.fuente = '';
    this.fecha = '';
  }

  guardarIngresos() {
    localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
  }

  cargarIngresos() {
    const ingresosGuardados = localStorage.getItem('ingresos');
    if (ingresosGuardados) {
      this.ingresos = JSON.parse(ingresosGuardados);
    }
  }
}
