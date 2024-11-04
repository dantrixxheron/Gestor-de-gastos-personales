import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: string[] = [];
  isAlertOpen = false;  // Controla si la alerta está visible
  alertButtons: any[] = [];  // Configuración de los botones de la alerta
  alertInputs: any[] = [];  // Configuración de los inputs de la alerta
  categoriaEnEdicion: string | null = null;  // Guarda la categoría que se está editando
  
  constructor(private navController: NavController) {
    // Configuramos los botones de la alerta
    this.alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.setOpen(false);
        },
      },
      {
        text: 'Guardar',
        handler: (data: any) => {
          if (this.categoriaEnEdicion) {
            this.actualizarCategoria(this.categoriaEnEdicion, data.categoriaNombre);
          } else {
            this.guardarCategoria(data.categoriaNombre);
          }
        },
      },
    ];
  }
  goBack(){
    this.navController.back();
  }
  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    this.categorias = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
     // Redefinir inputs para vaciar o prellenar el campo de entrada
     if (isOpen && !this.categoriaEnEdicion) {
      // Si es una nueva categoría
      this.alertInputs = [
        { name: 'categoriaNombre', type: 'text', placeholder: 'Categoría' },
      ];
    } else if (isOpen && this.categoriaEnEdicion) {
      // Si es una categoría a editar
      this.alertInputs = [
        { name: 'categoriaNombre', type: 'text', value: this.categoriaEnEdicion, placeholder: 'Editar Categoría' },
      ];
    }
  }

  guardarCategoria(nombre: string) {
    if (nombre && nombre.trim().length > 0) {
      this.categorias.push(nombre.trim());
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
    }
  }

  editarCategoria(categoria: string) {
    this.categoriaEnEdicion = categoria; // Almacena la categoría que se está editando
    this.setOpen(true); // Abre el modal con el campo prellenado
  }
  actualizarCategoria(categoriaActual: string, nuevoNombre: string) {
    if (nuevoNombre && nuevoNombre.trim().length > 0) {
      // Actualiza el nombre de la categoría en la lista
      const index = this.categorias.indexOf(categoriaActual);
      if (index > -1) {
        this.categorias[index] = nuevoNombre.trim();
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
      }
    }
    // Limpia la variable y cierra el modal
    this.categoriaEnEdicion = null;
    this.setOpen(false);
  }

  borrarCategoria(categoria: string) {
    // Lógica para borrar categoría
    this.categorias = this.categorias.filter((cat) => cat !== categoria);
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }
}
