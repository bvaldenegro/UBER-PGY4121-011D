import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario:string = "";

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    
    this.usuario = this.activatedRoute.snapshot.params["usuario"];

  }

}
