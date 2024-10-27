import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/usuario';
import { VehiculoModel } from 'src/app/models/vehiculo';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  // Objeto para almacenar los datos del viaje actual
  /* viaje = {
    conductor: '',
    pasajero: '',
    origen: '',
    destino: '',
    fechaHora: ''
  }; */
  

  // Arreglo para almacenar los viajes
  ubicacion_origen:string = "";
  ubicacion_destino:string = "";
  costo:number = 0;
  usuario:UserModel[] = [];
  viajes:any[] = [];
  vehiculoSeleccionado:string = "";

  constructor(private helper:HelperService, private storage:StorageService, private usuarioService:UsuarioService,
              private viajeService:ViajeService
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarViaje();
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

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    //console.log('Current value:', JSON.stringify(ev.target.value));
    this.vehiculoSeleccionado = ev.target.value.id_vehiculo
    //console.log("Id vehiculo seleccionado: ", this.vehiculoSeleccionado)
    return this.vehiculoSeleccionado;
  }

  // Método para agregar un viaje
  async agregarViaje() {
    // Verificar que todos los campos estén completos
    /* if (this.viaje.conductor && this.viaje.pasajero && this.viaje.origen && this.viaje.destino && this.viaje.fechaHora) {
      // Agregar el viaje al arreglo de viajes
      this.viajes.push({ ...this.viaje });
      // Limpiar el formulario
      this.limpiarFormulario();
    }else{
      alert("Uno o más campos vacios")
    } */

      let dataStorage = await this.storage.obtenerStorage()
      const loader = await this.helper.showLoader('Cargando...')
      const token = dataStorage[0].token
      try {
        if(token){
          console.log("Id seleccionado: ", this.vehiculoSeleccionado);
          const req = await this.viajeService.agregarViaje(
            {
              p_id_usuario:this.usuario[0].id_usuario,
              p_ubicacion_origen:this.ubicacion_origen,
              p_ubicacion_destino:this.ubicacion_destino,
              p_costo:this.costo,
              p_id_vehiculo:parseInt(this.vehiculoSeleccionado),
              token:token
            }
          )
          
        }
        await this.helper.showAlert("Viaje creado exitosamente", "Informacion");
        await loader.dismiss();
      } catch (error) {
        await loader.dismiss();
        console.log("Error en viajes pá")
        throw error;
      }
  }

  async cargarViaje(){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.viajeService.obtenerViaje(dataStorage[0].token)
    this.viajes = req.data;

  }

  // Método para limpiar el formulario después de agregar un viaje
  /* limpiarFormulario() {
    this.viaje = {
      conductor: '',
      pasajero: '',
      origen: '',
      destino: '',
      fechaHora: ''
    };
  } */
}
