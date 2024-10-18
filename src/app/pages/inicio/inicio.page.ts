import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  //Creamos la variable usuario (la misma que le pasaremos por la URL)
  correo:string = "";
  usuario:UserModel[]=[];
  //Agregamos el parametro activateRoute en el constructor
  constructor(private activateRoute: ActivatedRoute, private router:Router, private firebase:FirebaseService,
              private usuarioService:UsuarioService, private storage:StorageService
  ) { }

  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();
    const req = await this.usuarioService.obtenerUsuario(
      {
        p_correo: dataStorage[0].usuario_correo,
        token: dataStorage[0].token
      }
    );
    this.usuario = req.data;
  }

  ngOnInit() {
    //Le otorgamos un valor a usuario a través de la captura del dato por el metodo activateRoute
    this.cargarUsuario();
    this.usuario = this.activateRoute.snapshot.params["usuario"];
    
  }

  logout(){
    
    this.firebase.logOut();
    this.correo = "";
    this.router.navigateByUrl('/login')

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

  handleRefresh(event: any) {
    setTimeout(() => {
      // Aquí puedes añadir llamadas para cargar datos u otras acciones necesarias
      event.target.complete(); // Completa el refresco para detener el spinner
    }, 2000);
  }

}
