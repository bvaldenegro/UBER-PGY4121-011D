import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient) { }


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
