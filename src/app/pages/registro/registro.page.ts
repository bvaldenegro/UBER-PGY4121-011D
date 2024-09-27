import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario:string = "";
  password1:string = "";
  password2:string = "";

  constructor(private router:Router, private firebase:FirebaseService) { }

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

    this.firebase.registro(this.usuario, this.password1);

  }

}
