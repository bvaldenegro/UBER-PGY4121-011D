import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private router:Router, private firebase:FirebaseService, private usuario:UsuarioService) { }

  ngOnInit() {
  }

  signup(){
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

    this.firebase.registro(this.correo, this.password1);

  }

}
