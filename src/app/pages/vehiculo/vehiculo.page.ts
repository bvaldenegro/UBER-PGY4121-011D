import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  vehiculo = {
    marca: '',
    modelo: '',
    ano: '',
    patente: ''
  };

  vehiculos: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  agregarVehiculo() {
    // Validamos que todos los campos estén completos
    if (this.vehiculo.marca && this.vehiculo.modelo && this.vehiculo.ano && this.vehiculo.patente) {
      // Agregamos el vehículo a la lista
      this.vehiculos.push({ ...this.vehiculo });
      // Limpiamos el formulario
      this.limpiarFormulario();
    }else{
      alert("Uno o más campos vacios")
    }
  }

  limpiarFormulario() {
    // Reseteamos el objeto vehiculo para limpiar el formulario
    this.vehiculo = {
      marca: '',
      modelo: '',
      ano: '',
      patente: ''
    };
  }
}
