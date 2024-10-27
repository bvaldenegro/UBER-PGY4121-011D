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
      
      const body = {
        p_id_usuario: datosViaje.p_id_usuario,
        p_ubicacion_origen: datosViaje.p_ubicacion_origen,
        p_ubicacion_destino: datosViaje.p_ubicacion_destino,
        p_costo: datosViaje.p_costo,
        p_id_vehiculo: datosViaje.p_id_vehiculo,
        token: datosViaje.token
      };

      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar', body));
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

  async obtenerViajeRuta(id_viaje:number, parToken: string){
    try {
      const params = {
        p_id: id_viaje,
        token: parToken
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/obtener', {params}))
      return response;
    } catch (error) {
      throw(error);
    }
  }

  async actualizarEstado(estadoViaje:datosEstadoViaje){
    try {
      const body = {
        p_id_estado: estadoViaje.p_id_estado,
        p_id: estadoViaje.p_id,
        token: estadoViaje.token
      }
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/actualiza_estado_viaje', body))
      return response;
    } catch (error) {
      throw error;
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

interface datosEstadoViaje{
  p_id_estado:number,
  p_id:number,
  token:string
}