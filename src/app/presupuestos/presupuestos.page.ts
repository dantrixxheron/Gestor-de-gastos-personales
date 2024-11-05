import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.page.html',
  styleUrls: ['./presupuestos.page.scss'],
})
export class PresupuestosPage implements OnInit {
  @ViewChild('popover') popover: any;
  isOpen = false;
  selectedPresupuesto: any;
  categoria: string;
  categorias: any[] = [];
  monto: number;
  presupuestos: any[] = [];

  presentPopover(event: Event, presupuesto: any) {
    this.selectedPresupuesto = presupuesto; // Guardar el presupuesto seleccionado
    this.popover.event = event;
    this.isOpen = true;
  }
  constructor(
    private navCtrl: NavController,

  ) {
    this.categoria = '';
    this.monto = 0;
  }

  ngOnInit() {
    this.cargarPresupuestos();
    this.cargarCategorias();
    this.actualizarGastosPorCategoria(); // Llama a la función para actualizar gastos al iniciar
  }

  irACategorias() {
    this.navCtrl.navigateForward('/categorias');
  }
  
  goBack() {
    this.navCtrl.back();
  }

  cargarCategorias() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    this.categorias = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
  }

  agregarPresupuesto() {
    const nuevoPresupuesto = {
      categoria: this.categoria,
      monto: this.monto,
      totalGastado: 0 // Inicializa totalGastado
    };
    this.presupuestos.push(nuevoPresupuesto);
    this.guardarPresupuestos();
    this.limpiarFormulario();
    this.actualizarGastosPorCategoria(); // Actualiza los gastos después de agregar un presupuesto
  }
  

  calcularTotalGastos(presupuesto: any): number {
    return (presupuesto.gastos || []).reduce((total: number, gasto: number) => total + gasto, 0);
  }


// Carga los presupuestos guardados y verifica si están superados
cargarPresupuestos() {
  const presupuestosGuardados = localStorage.getItem('presupuestos');
  if (presupuestosGuardados) {
    this.presupuestos = JSON.parse(presupuestosGuardados);
  }
}

// Guarda los presupuestos actualizados
guardarPresupuestos() {
  this.presupuestos.forEach(presupuesto => {
    presupuesto.totalGastado = this.calcularTotalGastadoPorCategoria(presupuesto.categoria);
  });
  localStorage.setItem('presupuestos', JSON.stringify(this.presupuestos));
}

  
  limpiarFormulario() {
    this.categoria = '';
    this.monto = 0;
  }


  eliminarPresupuesto(presupuesto: any) {
    this.presupuestos = this.presupuestos.filter((p) => p !== presupuesto);
    this.guardarPresupuestos();
    this.actualizarGastosPorCategoria(); // Actualiza los gastos después de eliminar un presupuesto
    this.isOpen = false;
  }

  editarPresupuesto(presupuesto: any) {
    this.categoria = presupuesto.categoria;
    this.monto = presupuesto.monto;
    this.eliminarPresupuesto(presupuesto);
    this.isOpen = false;
  }

  actualizarGastosPorCategoria() {
    this.presupuestos.forEach(presupuesto => {
      presupuesto.totalGastado = this.calcularTotalGastadoPorCategoria(presupuesto.categoria);
    });
    this.guardarPresupuestos(); // Guarda el objeto actualizado con totalGastado
  }

  calcularTotalGastadoPorCategoria(categoria: string): number {
    const gastosGuardados = localStorage.getItem('gastos');
    const gastos: { categoria: string; monto: number }[] = gastosGuardados ? JSON.parse(gastosGuardados) : [];
    return gastos
      .filter((gasto: { categoria: string; monto: number }) => gasto.categoria === categoria)
      .reduce((total: number, gasto: { monto: number }) => total + gasto.monto, 0);
  }
}
