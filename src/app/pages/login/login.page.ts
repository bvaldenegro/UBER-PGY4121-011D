import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

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
  constructor(private router:Router, private firebase:FirebaseService) { }

  ngOnInit() {
  }

  //Creamos el metodo login que pasa la variable usuario a la vista inicio por la url
  login(){

    /*if (this.usuario != "" && this.password != "") {
      this.router.navigateByUrl("/inicio/" + this.usuario)
    }else{
      alert("Uno o más campos vacios!")
    } */
    
    this.firebase.login(this.usuario, this.password);
    this.router.navigateByUrl("/inicio/" + this.usuario);


  }

  resetPw(){
    this.router.navigateByUrl("reset-password");
  }

}
