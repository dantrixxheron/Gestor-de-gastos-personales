import { Component, ViewChild } from '@angular/core';
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
  editing: boolean = false;
  gastoAEditar: any = null;

  constructor(private navCtrl: NavController) {
    this.monto = 0;
    this.categoria = '';
    //asignar fecha por si no se selecciona
    this.fecha = new Date().toISOString().substring(0, 10);
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
    if (this.monto && this.categoria && this.fecha) {
      const nuevoGasto = {
        monto: this.monto,
        categoria: this.categoria,
        fecha: this.fecha,
        notas: this.notas,
      };
  
      if (this.editing) {
        // Estamos editando, actualizamos el gasto
        this.gastos = this.gastos.map(g => {
          if (g === this.gastoAEditar) {
            return nuevoGasto;
          }
          return g;
        });
        this.editing = false;
        this.gastoAEditar = null;
      } else {
        // Estamos agregando, añadimos el nuevo gasto
        this.gastos.push(nuevoGasto);
      }
  
      localStorage.setItem('gastos', JSON.stringify(this.gastos));
      const sumaGastos = this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
      localStorage.setItem('totalGastos', sumaGastos);
      this.limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  onDateTimeChange(event: any) {
    this.fecha = event.detail.value;
  }
  // Eliminar un gasto de la lista
  eliminarGasto(gasto: any) {
    this.gastos = this.gastos.filter(g => g !== gasto);
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
    const sumaGastos = this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
    localStorage.setItem('totalGastos', sumaGastos);
  }
  cancelarEdicion() {
    this.limpiarFormulario();
    this.editing = false;
    this.gastoAEditar = null;
  }
  // Editar un gasto (carga los datos al formulario)
  editarGasto(gasto: any) {
    this.monto = gasto.monto;
    this.categoria = gasto.categoria;
    this.fecha = gasto.fecha;
    this.notas = gasto.notas;
    this.gastoAEditar = gasto;
    this.editing = true;
  }

  // Limpiar los campos del formulario después de guardar un gasto
  limpiarFormulario() {
    this.monto = 0;
    this.categoria = '';
    this.fecha = '';
    this.notas = '';
  }
}
