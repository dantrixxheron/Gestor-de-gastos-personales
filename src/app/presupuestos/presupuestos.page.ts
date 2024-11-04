import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.page.html',
  styleUrls: ['./presupuestos.page.scss'],
})
export class PresupuestosPage implements OnInit {
  categoria: string;
  monto: number;
  presupuestos: any[] = [];

  constructor() {
    this.categoria = '';
    this.monto = 0;
  }

  ngOnInit() {
    this.cargarPresupuestos();
  }

  agregarPresupuesto() {
    if (this.categoria && this.monto > 0) {
      const nuevoPresupuesto = {
        categoria: this.categoria,
        monto: this.monto,
        superado: false // Inicialmente no está superado
      };
      this.presupuestos.push(nuevoPresupuesto);
      this.guardarPresupuestos();
      this.limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  eliminarPresupuesto(presupuesto : any) {
    this.presupuestos = this.presupuestos.filter(p => p !== presupuesto);
    this.guardarPresupuestos();
  }

  editarPresupuesto(presupuesto : any) {
    this.categoria = presupuesto.categoria;
    this.monto = presupuesto.monto;
    this.eliminarPresupuesto(presupuesto);
  }

  limpiarFormulario() {
    this.categoria = '';
    this.monto = 0;
  }

  guardarPresupuestos() {
    localStorage.setItem('presupuestos', JSON.stringify(this.presupuestos));
  }

  cargarPresupuestos() {
    const presupuestosGuardados = localStorage.getItem('presupuestos');
    if (presupuestosGuardados) {
      this.presupuestos = JSON.parse(presupuestosGuardados);
      this.verificarPresupuestosSuperados(); // Verificar si alguno está superado
    }
  }

  verificarPresupuestosSuperados() {
    // Aquí puedes implementar la lógica para verificar si se ha superado el presupuesto.
    // Esto puede depender de los gastos registrados. Para propósitos de este ejemplo,
    // vamos a suponer que si el monto asignado es 0 o menor, se considera superado.
    this.presupuestos.forEach(presupuesto => {
      if (presupuesto.monto <= 0) {
        presupuesto.superado = true;
      } else {
        presupuesto.superado = false;
      }
    });
  }
}
