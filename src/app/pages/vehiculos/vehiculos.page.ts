import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/usuario';
import { VehiculoModel } from 'src/app/models/vehiculo';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  marca:string = "";
  usuario:UserModel[] = [];
  loaded:boolean = false;
  vehiculo:VehiculoModel[] = [];

  constructor(private helper:HelperService, private vehiculoService:VehiculoService, private usuarioService:UsuarioService, private storage:StorageService) { }

  async ngOnInit() {
    this.cargarUsuario();
    const loader = await this.helper.showLoader('Cargando...')
    setTimeout(() =>{
      this.loaded = true;
      this.cargarVehiculo();
      loader.dismiss();
    },1000); 
  }

  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.usuarioService.obtenerUsuario(
      {
        p_correo: dataStorage[0].usuario_correo,
        token: dataStorage[0].token
      }
    );
    this.usuario = req.data;
    console.log("Usuario cargado: ", this.usuario)
  }

  async cargarVehiculo(){
    let dataStorage = await this.storage.obtenerStorage();

    console.log("Usuario id: ", this.usuario[0].id_usuario)

    const req = await this.vehiculoService.obtenerVehiculo(dataStorage[0].token, this.usuario[0].id_usuario)
    this.vehiculo = req.data;
  }

}
