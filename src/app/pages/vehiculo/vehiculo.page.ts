import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/usuario';
import { VehiculoModel } from 'src/app/models/vehiculo';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

/*   vehiculo = {
    marca: '',
    modelo: '',
    ano: '',
    patente: ''
  }; */

  patente:string = "";
  marca:string= "";
  modelo:string = "";
  anio:number = 0;
  color:string = "";
  tipo_combustible:string = "";
  nombre_proyecto:string ="";
  image:any;
  loaded:boolean = false;
  usuario:UserModel[] = [];
  vehiculo:VehiculoModel[] = [];

  constructor(private storage:StorageService, private usuarioService:UsuarioService, private vehiculoService: VehiculoService,
              private helper:HelperService, private firebase:FirebaseService
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    setTimeout(() =>{
      this.loaded = true;
      this.cargarVehiculo();
    },650)
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

  async agregarVehiculo() {
    /* // Validamos que todos los campos estén completos
    if (this.vehiculo.marca && this.vehiculo.modelo && this.vehiculo.ano && this.vehiculo.patente) {
      // Agregamos el vehículo a la lista
      this.vehiculos.push({ ...this.vehiculo });
      // Limpiamos el formulario
      this.limpiarFormulario();
    }else{
      alert("Uno o más campos vacios")
    } */
    let dataStorage = await this.storage.obtenerStorage()
    const loader = await this.helper.showLoader('Cargando...')
    const token = dataStorage[0].token
    try {
      if(token){  
        const req = await this.vehiculoService.agregarVehiculo(
          {
            p_id_usuario:this.usuario[0].id_usuario,
            p_patente: this.patente,
            p_marca: this.marca,
            p_modelo: this.modelo,
            p_anio: this.anio,
            p_color: this.color,
            p_tipo_combustible: this.tipo_combustible,
            p_nombre_proyecto: 'valdevergara',
            token:token
          }, this.image
        )
        console.log('No')
      }
      await this.helper.showAlert("vehiculo creado exitosamente", "Informacion");
      await loader.dismiss();

    } catch (error) {
      await loader.dismiss()
      console.log('Error po weon')
      throw error
    }
  }

  async cargarVehiculo(){
    let dataStorage = await this.storage.obtenerStorage();

    console.log("Usuario id: ", this.usuario[0].id_usuario)

    const req = await this.vehiculoService.obtenerVehiculo(dataStorage[0].token, this.usuario[0].id_usuario)
    this.vehiculo = req.data;
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality : 90,
      allowEditing : true,
      resultType : CameraResultType.Uri
    });
    if(image.webPath){
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.image = {
        fname: 'foto' + image.format,
        src: image.webPath,
        file : blob
      }
      var imageUrl = image.webPath;
      this.image.src = imageUrl;
    }
  }



  /* limpiarFormulario() {
    // Reseteamos el objeto vehiculo para limpiar el formulario
    this.vehiculo = {
      marca: '',
      modelo: '',
      ano: '',
      patente: ''
    };
  } */
}
