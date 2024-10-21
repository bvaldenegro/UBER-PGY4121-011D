import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }


  //
  async agregarUsuario(datosUsuario:dataBodyUsuario, imgFileUSer:any){

    try {
      
      const formData = new FormData();

      formData.append('p_nombre', datosUsuario.p_nombre);
      formData.append('p_correo_electronico', datosUsuario.p_correo_electronico);
      formData.append('p_telefono', datosUsuario.p_telefono);
      if (datosUsuario.token) {
        formData.append('token', datosUsuario.token); 
      }

      formData.append('image_usuario', imgFileUSer.file, imgFileUSer.name)

      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'user/agregar', formData));
      return response;

    } catch (error) {
      throw error;
    }

  }

  async obtenerUsuario(data:dataGetUser){

    try {
      //Constante para obtener los parametros de la interfaz
      const params = {
        p_correo: data.p_correo,
        token: data.token
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'user/obtener', {params}));
      return response;

    } catch (error) {

      throw(error)
    }

  }


}

interface dataBodyUsuario{
  p_nombre:string;
  p_correo_electronico:string;
  p_telefono:string;
  token?:string; //El ? es para dejarlo como un dato opcional. (Puede que los strings no sean necesarios dejarlos como opcional)
}

interface dataGetUser{
  p_correo:string;
  token:string;
}