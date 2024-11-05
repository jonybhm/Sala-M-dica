import { Component, OnInit} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  usuarios: any[] = [];
  usuarioSeleccionado: any;
  sub!: Subscription;
  
  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,
  )
  {}

  ngOnInit(): void {
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
  
  seleccionar(usuario: any)
  {
    this.usuarioSeleccionado = usuario;
  }

 

}
