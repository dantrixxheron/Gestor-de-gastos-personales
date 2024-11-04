import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  nuevaCategoriaGasto: string = '';
  categoriasGastos: string[] = [];
  alertasGastos: boolean = true;
  recordatoriosPresupuesto: boolean = true;
  idiomaSeleccionado: string = 'es';
  monedaSeleccionada: string = 'usd';

  constructor(private navController: NavController) {}

  ngOnInit() {
    this.cargarConfiguraciones();
  }

  agregarCategoriaGasto() {
    this.navController.navigateRoot('/categorias');

  }

  cargarConfiguraciones() {
    const config = localStorage.getItem('configuracion');
    if (config) {
      const configuracion = JSON.parse(config);
      this.categoriasGastos = configuracion.categoriasGastos || [];
      this.alertasGastos = configuracion.alertasGastos || true;
      this.recordatoriosPresupuesto = configuracion.recordatoriosPresupuesto || true;
      this.idiomaSeleccionado = configuracion.idiomaSeleccionado || 'es';
      this.monedaSeleccionada = configuracion.monedaSeleccionada || 'usd';
    }
  }

  guardarConfiguraciones() {
    const configuracion = {
      categoriasGastos: this.categoriasGastos,
      alertasGastos: this.alertasGastos,
      recordatoriosPresupuesto: this.recordatoriosPresupuesto,
      idiomaSeleccionado: this.idiomaSeleccionado,
      monedaSeleccionada: this.monedaSeleccionada
    };
    localStorage.setItem('configuracion', JSON.stringify(configuracion));
  }
}
