import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


const llaveUber = "llaveAplicacionUber";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(llave:string, valor:string){

    await Preferences.set({key:llave, value:valor});

  }

  async getItem(llave:string): Promise <string | null>{

    const obj = await Preferences.get({key:llave});
    return obj.value;

  }
  //los metodos asincronos reciben una promesa para poder funcionar
  async agregarToken(dataJson:any){

    this.setItem(llaveUber, JSON.stringify(dataJson)); 

  }

  async obtenerStorage(){

    const storageData = await this.getItem(llaveUber); //Esto nos devuelve undefined
    if (storageData == null){
      return [];
    }else{
      return JSON.parse(storageData);
    }

  }

}
