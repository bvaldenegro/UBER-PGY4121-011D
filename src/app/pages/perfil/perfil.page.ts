import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario:UserModel[] = [];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private storage:StorageService,
              private usuarioService: UsuarioService
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
    console.log("Usuario cargado: ", this.usuario)
  }

  ngOnInit() {
    
    this.cargarUsuario();
    this.usuario = this.activatedRoute.snapshot.params["usuario"];

  }

  return(){
    this.router.navigateByUrl("/inicio")
  }

}
