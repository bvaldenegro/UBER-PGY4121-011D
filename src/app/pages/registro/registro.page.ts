import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  correo:string = "";
  nombre:string ="";
  telefono:string ="";
  password1:string = "";
  password2:string = "";
  imagen:any;

  constructor(private router:Router, private firebase:FirebaseService, private usuarioService:UsuarioService, private helper:HelperService) { }

  ngOnInit() {
  }

  async registro(){
    /*
    //Validamos que los campos no estén vacios
    if (this.usuario != "" && this.password1 != "" && this.password2 != "") {
      
      //Validamos que ambas contraseñas sean iguales
      if (this.password1 == this.password2) {

        this.router.navigateByUrl("/inicio/" + this.usuario);
        
      }else{
        alert("Asegurese de que ambas contraseñas sean iguales")
      }
    }else{
      alert("Uno o más campos vacios")
    }*/
      const loader = await this.helper.showLoader("Cargando...");
      try {
        // await this.firebase.registro(this.correo, this.password1);

        const userFirebase = await this.firebase.registro(this.correo, this.password1);
        const token = await userFirebase.user?.getIdToken();

        if(token){
          const req = await this.usuarioService.agregarUsuario(
            {
              p_correo_electronico:this.correo,
              p_nombre:this.nombre,
              p_telefono:this.telefono,
              token:token
            },
            this.imagen
          )
        }

        await this.helper.showAlert("Usuario creado exitosamente", "Informacion");
        await this.router.navigateByUrl('login');

        await loader.dismiss();

      } catch (error:any) {
        let msg = "Error al registrar usuario"
        if (error.code == "auth/email-already-in-use") {
          msg = "Este usuario ya ha sido registrado previamente"
        }else if(error.code == "auth/invalid-email"){
          msg = "Email no valido"
        }else if(error.code == "auth/weak-password"){
          msg = "La contraseña es demasiado debil"
        }
        this.helper.showAlert(msg, "Error de registro");
        loader.dismiss();
      }
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality : 90,
      allowEditing : true,
      resultType : CameraResultType.Uri
    });
    if(image.webPath){
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen = {
        fname: 'foto' + image.format,
        src: image.webPath,
        file : blob
      }
      var imageUrl = image.webPath;
      this.imagen.src = imageUrl;
    }
  }

}
