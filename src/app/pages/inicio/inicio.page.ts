import { StorageService } from './../../services/storage.service';
import { Component, OnInit, ElementRef, ViewChildren} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  //Creamos la variable usuario (la misma que le pasaremos por la URL)
  correo:string = "";
  nombre:string = "";
  imagen_usuario: string = "";
  usuario:UserModel[]=[];
  viajes:any[]=[];
  index:number = 0;
  loaded:boolean = false;
  private animation!: Animation;
  //Agregamos el parametro activateRoute en el constructor
  constructor(private navCtrl: NavController,private activateRoute: ActivatedRoute, private router:Router, private firebase:FirebaseService,
              private usuarioService:UsuarioService, private storage:StorageService, private viajeService:ViajeService,
              private helper:HelperService, private animationCtrl: AnimationController
  ) { }


  async ngOnInit() {
    //Le otorgamos un valor a usuario a través de la captura del dato por el metodo activateRoute
    const loader = await this.helper.showLoader('Cargando...')
    setTimeout(() =>{
      this.cargarUsuario();
      this.loaded = true;
      loader.dismiss();
    },1000)
    
  }

  async ionViewWillEnter() {
    this.cargarViajes();
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
    //Dado a que, por tener varios vehiculos automaticamente se vincula a un usuario, lo que provoca que el usuario se duplique, utilizaremos valores más estáticos.
    this.nombre = this.usuario[0].nombre;
    this.imagen_usuario = this.usuario[0].imagen_usuario;
    console.log("Usuario cargado: ", this.usuario)
  }


  async seleccionarViaje(parId:number){
    console.log("Viaje Seleccionado ", parId)
    for (let index = 0; index < this.viajes.length; index++) {
      const element = this.viajes[index];
      if (element.id_viaje == parId) {
        this.index = index
        break
      }
      console.log("Viajes: ", this.viajes, "Index: ", index)
      this.index = index
    }
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(this.index)!.nativeElement)
      .duration(1000)
      .beforeStyles({
        filter: 'invert(75%)',
      })
      .beforeClearStyles(['filter'])
      .afterStyles({
        'box-shadow': 'rgba(0, 0, 250, 0.4) 0px 4px 16px 6px',
      })
      .afterClearStyles(['filter'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.2, transform: 'scale(1.5)' },
        { offset: 0.5, transform: 'scale(1)' },
      ]);

    this.animation = this.animationCtrl.create().duration(500).addAnimation([card]);
    this.animation.play()

    let dataStorage = await this.storage.obtenerStorage();
    try {
        const req = await this.viajeService.actualizarEstado(
          {
            p_id_estado: 2,
            p_id: parId,
            token: dataStorage[0].token
          }
        )
        this.helper.showAlert("Viaje seleccionado con éxito", 'Informacion')
        this.viajeService.obtenerViajeRuta(parId, dataStorage[0].token);
        this.cargarViajesRuta(parId)
      
    } catch (error) {
      this.helper.showAlert("Ocurrió un error al seleccionar el viaje", "Error")
      throw error
    }
  }

  async finalizarViaje(parId: number){
    console.log("Viaje Seleccionado ", parId)
    let dataStorage = await this.storage.obtenerStorage();
    let confirmacion = await this.helper.showConfirm("Finalizar viaje")
    if(confirmacion){
      try {
        const req = await this.viajeService.actualizarEstado(
          {
            p_id_estado: 3,
            p_id: parId,
            token: dataStorage[0].token
          }
        )
        this.helper.showAlert("Viaje finalizado con éxito", 'Informacion')
        this.viajeService.obtenerViaje(dataStorage[0].token);
        this.cargarViajes();

      } catch (error) {
        this.helper.showAlert("Ocurrió un error al finalizar el viaje", "Error")
        throw error
      }
    }
  }

  async cancelarViaje(parId: number){
    console.log("Viaje Seleccionado ", parId)
    let dataStorage = await this.storage.obtenerStorage();
    let confirmacion = await this.helper.showConfirm("Cancelar viaje")
    if(confirmacion){
      try {
        const req = await this.viajeService.actualizarEstado(
          {
            p_id_estado: 1,
            p_id: parId,
            token: dataStorage[0].token
          }
        )
        this.helper.showAlert("Viaje cancelado con éxito", 'Informacion')
        this.viajeService.obtenerViaje(dataStorage[0].token);
        this.cargarViajes();

      } catch (error) {
        this.helper.showAlert("Ocurrió un error al cancelar el viaje", "Error")
        throw error
      }
    }
  }


  async cargarViajes(){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.viajeService.obtenerViaje(dataStorage[0].token)
    this.viajes = req.data;
    console.log("Viajes cargados: ", this.viajes)
    
  }

  async cargarViajesRuta(parId: number){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.viajeService.obtenerViajeRuta(parId,dataStorage[0].token)
    this.viajes = req.data;
    console.log("Viajes cargados: ", this.viajes)
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

  listarVehiculos(){
    this.router.navigateByUrl("/vehiculos");
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Aquí puedes añadir llamadas para cargar datos u otras acciones necesarias
      event.target.complete(); // Completa el refresco para detener el spinner
    }, 2000);
  }

  abrirMapa() {
    this.navCtrl.navigateForward('/mapa');
  }
}

