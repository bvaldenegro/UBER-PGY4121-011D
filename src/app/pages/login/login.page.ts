import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Creamos las variables de la página
  usuario:string = "";
  password:string ="";

  //Ingresamos el parametro router en el constructor.
  constructor(private router:Router, private firebase:FirebaseService, 
              private helper:HelperService, private storage:StorageService) { }

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
    if (this.usuario = ""){
      this.helper.showAlert("Ingrese el correo", "Error");
    }
    this.firebase.login(this.usuario, this.password);
    //Creación del archivo Json
    const jsonToken = [
      {

        "token":"123asdasdasd123"

      }
    ]

    this.storage.agregarToken(jsonToken);
    //Obtenemos la info que guardamos en storage
    console.log(await this.storage.obtenerStorage());

    this.router.navigateByUrl("/inicio/" + this.usuario);


  }

  resetPw(){
    this.router.navigateByUrl("reset-password");
  }

}
