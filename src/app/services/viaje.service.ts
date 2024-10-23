import { last, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient) { }

  async agregarViaje(datosViaje:datosBodyViaje){

    try {
      
      const formData = new FormData();

      formData.append('p_id_usuario', datosViaje.p_id_usuario.toString()),
      formData.append('p_ubicacion_origen', datosViaje.p_ubicacion_origen),
      formData.append('p_ubicacion_destino', datosViaje.p_ubicacion_destino),
      formData.append('p_costo', datosViaje.p_costo.toString()),
      formData.append('p_id_vehiculo', datosViaje.p_id_vehiculo.toString()),
      formData.append('token', datosViaje.token)

      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar', formData));
      return response;

    } catch (error) {
      console.log(error)
      throw error
    }
    

  }


  async obtenerViaje(parToken:string){
    try {
      const params = {
        token: parToken
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/obtener', {params}))
      return response;
    } catch (error) {
      throw(error);
    }
  }
}

interface datosBodyViaje{
  p_id_usuario:number,
  p_ubicacion_origen:string,
  p_ubicacion_destino:string,
  p_costo:number,
  p_id_vehiculo:number,
  token:string
}
