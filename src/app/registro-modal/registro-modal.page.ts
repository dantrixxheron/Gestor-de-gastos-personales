import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.page.html',
  styleUrls: ['./registro-modal.page.scss'],
})
export class RegistroModalPage {
  nombreUsuario: string = '';
  numeroCelular: string = '';
  correoRegistro: string = '';
  contrasenaRegistro: string = '';

  constructor(private modalController: ModalController, private alertController: AlertController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async registrarUsuario() {

    // Guardar el usuario en localStorage o base de datos (aquí es un ejemplo con localStorage)
    const usuario = {
      nombre: this.nombreUsuario,
      celular: this.numeroCelular,
      correo: this.correoRegistro,
      contrasena: this.contrasenaRegistro,
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Cerrar el modal
    this.modalController.dismiss();
  }
}
