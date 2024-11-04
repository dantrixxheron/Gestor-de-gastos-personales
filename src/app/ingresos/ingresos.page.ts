import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {
  monto: number;
  categoria: string;
  fecha: string;
  notas: string;
  ingresos: any[] = [];
  categorias: string[] = []; // Lista de categorías de ingresos

  constructor(private navCtrl: NavController) {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }

  ngOnInit() {
    this.cargarCategorias(); // Cargar categorías al iniciar
    this.cargarIngresos(); // Cargar ingresos al iniciar
  }

  ionViewWillEnter() {
    this.cargarCategorias();
  }

  goBack() {
    this.navCtrl.back();
  }

  // Cargar categorías desde localStorage
  cargarCategorias() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    this.categorias = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
  }

  cargarIngresos() {
    const ingresosGuardados = localStorage.getItem('ingresos');
    this.ingresos = ingresosGuardados ? JSON.parse(ingresosGuardados) : [];
  }

  // Redirigir a la página de categorías
  irACategorias() {
    this.navCtrl.navigateForward('/categorias');
  }

  // Agregar un ingreso a la lista
  agregarIngreso() {
    if (this.monto && this.categoria) {
      if (this.fecha == '') {
        this.fecha = new Date().toISOString().slice(0, 10);
      }
      const nuevoIngreso = {
        monto: this.monto,
        categoria: this.categoria,
        fecha: this.fecha,
        notas: this.notas,
      };
      this.ingresos.push(nuevoIngreso);
      localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
      const sumaIngresos = this.ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
      localStorage.setItem('totalIngresos', sumaIngresos.toString());
      this.limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  // Eliminar un ingreso de la lista
  eliminarIngreso(ingreso: any) {
    this.ingresos = this.ingresos.filter(i => i !== ingreso);
    localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
    const sumaIngresos = this.ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
    localStorage.setItem('totalIngresos', sumaIngresos.toString());
  }

  // Editar un ingreso (carga los datos al formulario)
  editarIngreso(ingreso: any) {
    this.monto = ingreso.monto;
    this.categoria = ingreso.categoria;
    this.fecha = ingreso.fecha;
    this.notas = ingreso.notas;
    this.eliminarIngreso(ingreso);
  }

  // Limpiar el formulario después de guardar un ingreso
  limpiarFormulario() {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }
}
