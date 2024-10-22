import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  //Creamos la variable usuario (la misma que le pasaremos por la URL)
  correo:string = "";
  nombre:string = "";
  imagen_usuario: string = "";
  usuario:UserModel[]=[];
  viajes:any[]=[];
  //Agregamos el parametro activateRoute en el constructor
  constructor(private activateRoute: ActivatedRoute, private router:Router, private firebase:FirebaseService,
              private usuarioService:UsuarioService, private storage:StorageService, private viajeService:ViajeService,
              private helper:HelperService
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
    //Dado a que, por tener varios vehiculos automaticamente se vincula a un usuario, lo que provoca que el usuario se duplique, utilizaremos valores más estáticos.
    this.nombre = this.usuario[0].nombre;
    this.imagen_usuario = this.usuario[0].imagen_usuario;
    console.log("Usuario cargado: ", this.usuario)
  }


  seleccionarViaje(parId:number){
    console.log("Viaje Seleccionado ", parId)
  }


  async cargarViajes(){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.viajeService.obtenerViaje(dataStorage[0].token)
    this.viajes = req.data;
  }


  ngOnInit() {
    //Le otorgamos un valor a usuario a través de la captura del dato por el metodo activateRoute
    this.cargarUsuario();
    this.cargarViajes();
    this.usuario = this.activateRoute.snapshot.params["usuario"];
    
  }

  async logout(){
    
    const confirmar = await this.helper.showConfirm("Cerrar Sesion");
    if(confirmar){
      this.firebase.logOut();
      this.correo = "";
      this.router.navigateByUrl('/login');
    }

  }

  profile(){
    this.router.navigateByUrl("/perfil");
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
