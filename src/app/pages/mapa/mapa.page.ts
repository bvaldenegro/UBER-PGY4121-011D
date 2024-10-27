import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  latitud: number | null = null;
  longitud: number | null = null;

  constructor() { }

  ngOnInit() {
    this.obtenerUbicacion();
  }

  async obtenerUbicacion() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      this.latitud = coordenadas.coords.latitude;
      this.longitud = coordenadas.coords.longitude;
      console.log('Latitud:', this.latitud);
      console.log('Longitud:', this.longitud);
      // Aquí puedes agregar lógica para actualizar el mapa con las nuevas coordenadas
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }
}
