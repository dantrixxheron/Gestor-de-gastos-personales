import { Component, viewChild } from '@angular/core';
import { NavController, IonModal } from '@ionic/angular';

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
  categorias: string[] = []; // Lista de categorías cargadas

  constructor(private navCtrl: NavController) {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }
  ngOnInit() {
    this.cargarCategorias(); // Cargar categorías al iniciar
    this.cargarGastos(); // Cargar gastos al iniciar
  }

ionViewWillEnter() {
  this.cargarCategorias();
}
goBack() {
  this.navCtrl.back();
}
  // Función para cargar las categorías desde localStorage
  cargarCategorias() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    this.categorias = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
  }
  cargarGastos() {
    const gastosGuardados = localStorage.getItem('gastos');
    this.gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
  }
  // Función para redirigir a la página de categorías
  irACategorias() {
    this.navCtrl.navigateForward('/categorias');
  }

  // Agregar un gasto a la lista
  agregarGasto() {
    if (this.monto && this.categoria) {
      if(this.fecha == ''){
        this.fecha = new Date().toISOString().slice(0, 10);
      }
      const nuevoGasto = {
        monto: this.monto,
        categoria: this.categoria,
        fecha: this.fecha,
        notas: this.notas,
      };
      this.gastos.push(nuevoGasto);
      localStorage.setItem('gastos', JSON.stringify(this.gastos));
      this.limpiarFormulario();
    } else {
      alert(`Por favor, completa todos los campos requeridos.`);
    }
  }

  // Eliminar un gasto de la lista
  eliminarGasto(gasto: any) {
    this.gastos = this.gastos.filter(g => g !== gasto);
  }

  // Editar un gasto (carga los datos al formulario)
  editarGasto(gasto: any) {
    this.monto = gasto.monto;
    this.categoria = gasto.categoria;
    this.fecha = gasto.fecha;
    this.notas = gasto.notas;
    this.eliminarGasto(gasto);
  }

  // Limpiar los campos del formulario después de guardar un gasto
  limpiarFormulario() {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }
}
