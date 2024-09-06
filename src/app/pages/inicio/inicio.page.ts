import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  //Creamos la variable usuario (la misma que le pasaremos por la URL)
  usuario:string = "";

  //Agregamos el parametro activateRoute en el constructor
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    //Le otorgamos un valor a usuario a través de la captura del dato por el metodo activateRoute
    this.usuario = this.activateRoute.snapshot.params["usuario"];
    console.log("PARAMETRO --->", this.usuario);
    
  }

}
