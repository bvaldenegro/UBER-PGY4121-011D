import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  correo:string = "";

  constructor(private firebase:FirebaseService, private helper:HelperService) { }

  ngOnInit() {
  }

  async reset(){
    const loader = await this.helper.showLoader("Cargando su solicitud...");
    try {
      await this.firebase.resetPassword(this.correo);
      loader.dismiss()
    } catch (error:any) {
      let msg = "Error al intentar recuperar contraseña"
      if(error.code == "auth/invalid-email"){
        msg = "No se reconoce este email, por favor intente nuevamente."
      }
      this.helper.showAlert(msg, "Error");
      loader.dismiss();
    }
  }

}
