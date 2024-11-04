import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {
  correoElectronico: string = '';
  contrasena: string = '';
  usoBiometria: boolean = false;
  protegerDatos: boolean = true;

  constructor(private alertController: AlertController, private navController: NavController) {}

  ngOnInit() {
    this.cargarConfiguraciones();
  }

  async iniciarSesion() {
    // Simulación de inicio de sesión
    if (this.correoElectronico === 'usuario@ejemplo.com' && this.contrasena === 'contraseña123') {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Has iniciado sesión correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
      alert.onDidDismiss().then(() => {
        // Redirigir a la página de inicio (home)
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

  cargarConfiguraciones() {
    const config = localStorage.getItem('configuracionSeguridad');
    if (config) {
      const configuracion = JSON.parse(config);
      this.usoBiometria = configuracion.usoBiometria || false;
      this.protegerDatos = configuracion.protegerDatos || true;
    }
  }

  guardarConfiguraciones() {
    const configuracion = {
      usoBiometria: this.usoBiometria,
      protegerDatos: this.protegerDatos
    };
    localStorage.setItem('configuracionSeguridad', JSON.stringify(configuracion));
  }
}
