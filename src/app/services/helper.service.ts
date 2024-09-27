import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService:AlertController) { }


  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create(
      {
        cssClass:"",
        message:msg,
        header:title,
        buttons:['Aceptar']
      }
    )
    return alert;
  }


}
