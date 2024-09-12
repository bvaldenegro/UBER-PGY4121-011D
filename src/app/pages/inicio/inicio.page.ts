import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  //Creamos la variable usuario (la misma que le pasaremos por la URL)
  usuario:string = "";

  //Agregamos el parametro activateRoute en el constructor
  constructor(private activateRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    //Le otorgamos un valor a usuario a través de la captura del dato por el metodo activateRoute
    this.usuario = this.activateRoute.snapshot.params["usuario"];
    console.log("PARAMETRO ------- " + this.usuario);
    
  }

  logout(){
    
    this.usuario = "";
    this.router.navigateByUrl('/login')
    console.log("PARAMETRO ------- " + this.usuario);

  }

  profile(){
    this.router.navigateByUrl("/perfil/" + this.usuario);
  }

  agregarViaje(){
    this.router.navigateByUrl("/viaje");
  }

  agregarVehiculo(){
    this.router.navigateByUrl("/vehiculo");
  }

}
