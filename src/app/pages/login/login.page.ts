import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit() {
  }

  //Creamos el metodo login que pasa la variable usuario a la vista inicio por la url
  login(){

    this.router.navigateByUrl("/inicio/" + this.usuario)
    
  }

}
