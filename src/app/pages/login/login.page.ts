import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Creamos las variables de la página
  correo:string = "";
  password:string ="";
  token:string = "";
  usuario:UserModel[] = [];

  //Ingresamos el parametro router en el constructor.
  constructor(private router:Router, private firebase:FirebaseService, 
              private helper:HelperService, private storage:StorageService,
              private usuarioService:UsuarioService) { }

  ngOnInit() {
  }

  //Creamos el metodo login que pasa la variable usuario a la vista inicio por la url
  async login(){

    /*if (this.usuario != "" && this.password != "") {
      this.router.navigateByUrl("/inicio/" + this.usuario)
    }else{
      alert("Uno o más campos vacios!")
    } */
    //Para usar el helper
    /* if (this.usuario = ""){
      this.helper.showAlert("Ingrese el correo", "Error");
    } */

      //Cada que se llama a un loader es necesario retirarlo
      const loader = await this.helper.showLoader("Cargando...");
    try {
      const reqFireBase = await this.firebase.login(this.correo, this.password);
      this.router.navigateByUrl("/inicio/" + this.correo);
      //solicitud get user
      const token = await reqFireBase.user?.getIdToken();
      if(token){
        this.token = token;
        const req = await this.usuarioService.obtenerUsuario({
          p_correo: this.correo,
          token: token
        }
        );
        this.usuario = req.data;
        //Acceder a los modelos
        this.usuario[0].id_usuario;
      }
      
      loader.dismiss();
      
    } catch (error:any) {
      let msg = "Ocurrió un error al iniciar sesión.";
      //
      if(error.code == "auth/invalid-credential"){
        msg = "Credenciales invalidas"
      }else if(error.code == "auth/auth/wrong-password"){
        msg = "Contraseña incorrecta";
      }else if(error.code == "auth/invalid-email"){
        msg = "Email no valido"
      }else if(error.code == "auth/user-not-found"){
        msg = "El usuario no se encuentra registrado"
      }

      this.helper.showAlert(msg, "Error de ingreso");
      //Para detener el loader
      loader.dismiss();
    }


    //Creación del archivo Json
    const jsonToken = [
      {

        "token":this.token,
        "usuario_id" : this.usuario[0].id_usuario,
        "usuario_correo": this.usuario[0].correo_electronico

      }
    ]

    this.storage.agregarToken(jsonToken);
    //Obtenemos la info que guardamos en storage
    console.log(await this.storage.obtenerStorage());


  }

  resetPw(){
    this.router.navigateByUrl("reset-password");
  }

}
