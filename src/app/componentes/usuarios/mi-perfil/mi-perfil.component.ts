import { Component,Input,OnInit} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../servicios/actualizar-datos.service';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { Observable, Subscription,map } from 'rxjs'; 

interface User 
{
  email: string;
  rol: string;
  habilitado: boolean;
  imagenPerfil1: string;
}

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export class MiPerfilComponent implements OnInit{
  usuarios: any[] = [];
  sub!: Subscription;
  public usuarioData: User | undefined;

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore
  )
  {}

  ngOnInit(): void 
  {   
    
    this.obtenerUsuariosDB();
  }
  
  obtenerUsuariosDB() 
  {
    const coleccion = collection(this.firestore, 'usuarios');
    const filteredQuery = query(coleccion, where("email", "==", this.auth.currentUser?.email));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarios = respuesta;
      console.log("USUARIO ACTUAL:");
      console.log(this.usuarios);
    });
  }
}
