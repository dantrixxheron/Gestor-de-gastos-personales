import { Component } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { RegistroModalPage } from '../registro-modal/registro-modal.page';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage {
  correoElectronico: string = '';
  contrasena: string = '';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navController: NavController
  ) {}

  // Función para abrir el modal de registro
  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: RegistroModalPage,
    });
    await modal.present();
  }

  // Función para iniciar sesión
  async iniciarSesion() {
    // Obtener los usuarios registrados de localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar si el correo y la contraseña coinciden con un usuario registrado
    const usuarioEncontrado = usuarios.find(
      (user: any) => user.correo === this.correoElectronico && user.contrasena === this.contrasena
    );

    if (usuarioEncontrado) {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Has iniciado sesión correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      // Redirigir a la página de inicio después de que el usuario cierre la alerta
      alert.onDidDismiss().then(() => {
        this.navController.navigateRoot('/home');
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo electrónico o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
