import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoService } from '../../../servicios/git-hub-info.service';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  sub!: Subscription;
  informacion:any;
  imgUrl:string='';
  usuarioGitHub:string='';
  repos:string='';
  
  usuarios: any[] = [];
  usuarioSeleccionado: any;

  constructor(
    private info: InfoService,
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,

  )
  {}

  ngOnInit(): void {
    this.sub = this.info.obtnerInfo().subscribe(infoPersonal => {
      this.informacion = infoPersonal;
      this.imgUrl = this.informacion.avatar_url;
      this.usuarioGitHub = this.informacion.login;
      this.repos = this.informacion.repos_url;

    });
    this.obtenerUsuariosDB();
  }


  obtenerUsuariosDB() 
  {
    const coleccion = collection(this.firestore, 'usuarios');
    const filteredQuery = query(coleccion, orderBy("email", "asc"));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarios = respuesta;
      console.log("USUARIOS:");
      console.log(this.usuarios);
    });
  }
}
