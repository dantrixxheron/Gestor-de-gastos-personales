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
  editing: boolean = false;
  ingresoAEditar: any = null;

  constructor(private navCtrl: NavController) {
    this.monto = 0;
    this.categoria = '';
    this.fecha = new Date().toISOString().substring(0, 10);
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
    if (this.monto && this.categoria && this.fecha) {
      const nuevoGasto = {
        monto: this.monto,
        categoria: this.categoria,
        fecha: this.fecha,
        notas: this.notas,
      };
  
      if (this.editing) {
        // Estamos editando, actualizamos el gasto
        this.ingresos = this.ingresos.map(g => {
          if (g === this.ingresoAEditar) {
            return nuevoGasto;
          }
          return g;
        });
        this.editing = false;
        this.ingresoAEditar = null;
      } else {
        // Estamos agregando, añadimos el nuevo gasto
        this.ingresos.push(nuevoGasto);
      }
  
      localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
      const sumaIngresos = this.ingresos.reduce((total, gasto) => total + gasto.monto, 0);
      localStorage.setItem('totalIngresos', sumaIngresos);
      this.limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  onDateTimeChange(event: any) {
    this.fecha = event.detail.value;
  }
  // Eliminar un ingreso de la lista
  eliminarIngreso(ingreso: any) {
    this.ingresos = this.ingresos.filter(i => i !== ingreso);
    localStorage.setItem('ingresos', JSON.stringify(this.ingresos));
    const sumaIngresos = this.ingresos.reduce((total, gasto) => total + gasto.monto, 0);
    localStorage.setItem('totalIngresos', sumaIngresos);
  }

  cancelarEdicion() {
    this.limpiarFormulario();
    this.editing = false;
    this.ingresoAEditar = null;
  }
  // Editar un gasto (carga los datos al formulario)
  editarIngreso(ingreso: any) {
    this.monto = ingreso.monto;
    this.categoria = ingreso.categoria;
    this.fecha = ingreso.fecha;
    this.notas = ingreso.notas;
    this.ingresoAEditar = ingreso;
    this.editing = true;
  }

  // Limpiar el formulario después de guardar un ingreso
  limpiarFormulario() {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }
}
