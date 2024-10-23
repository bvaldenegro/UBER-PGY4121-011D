import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http:HttpClient) { }


  async agregarVehiculo(datosVehiculo:dataBodyVehiculo, imgFileVehiculo:any){
    try {
      
      const formData = new FormData();

      formData.append('p_id_usuario', datosVehiculo.p_id_usuario.toString())
      formData.append('p_patente', datosVehiculo.p_patente),
      formData.append('p_marca', datosVehiculo.p_marca),
      formData.append('p_modelo', datosVehiculo.p_modelo),
      formData.append('p_anio', datosVehiculo.p_anio.toString()),
      formData.append('p_color', datosVehiculo.p_color),
      formData.append('p_tipo_combustible', datosVehiculo.p_tipo_combustible),
      formData.append('token', datosVehiculo.token),
      formData.append('image', imgFileVehiculo.file, imgFileVehiculo.name)

      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'vehiculo/agregar', formData));
      return response;


    } catch (error) {
      throw error
    }
  }

  async obtenerVehiculo(parToken:string, id_usuario:number){
    try {
      
      const params = {
        p_id:id_usuario,
        token:parToken
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + "vehiculo/obtener", {params}))
      return response

    } catch (error) {
      throw error
    }
  }
}

interface dataBodyVehiculo{
  p_id_usuario:number;
  p_patente: string;
  p_marca: string;
  p_modelo: string;
  p_anio: number;
  p_color: string;
  p_tipo_combustible: string;
  p_nombre_proyecto?: string;
  token:string;
}
