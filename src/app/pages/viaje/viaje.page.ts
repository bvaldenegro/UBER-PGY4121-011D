import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  // Objeto para almacenar los datos del viaje actual
  viaje = {
    conductor: '',
    pasajero: '',
    origen: '',
    destino: '',
    fechaHora: ''
  };

  // Arreglo para almacenar los viajes
  viajes: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  // Método para agregar un viaje
  agregarViaje() {
    // Verificar que todos los campos estén completos
    if (this.viaje.conductor && this.viaje.pasajero && this.viaje.origen && this.viaje.destino && this.viaje.fechaHora) {
      // Agregar el viaje al arreglo de viajes
      this.viajes.push({ ...this.viaje });
      // Limpiar el formulario
      this.limpiarFormulario();
    }else{
      alert("Uno o más campos vacios")
    }
  }

  // Método para limpiar el formulario después de agregar un viaje
  limpiarFormulario() {
    this.viaje = {
      conductor: '',
      pasajero: '',
      origen: '',
      destino: '',
      fechaHora: ''
    };
  }
}
