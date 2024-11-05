import { Injectable } from '@angular/core';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { Observable, Subscription,map } from 'rxjs';

interface User 
{
  email: string;
  rol: string;
  habilitado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BuscarDatosUsuariosService {

  usuarios: any[] = [];
  sub!: Subscription;

  constructor(private firestore:Firestore) { }

  obtenerUsuariosDB() 
  {
    const coleccion = collection(this.firestore, 'usuarios');   
    const filteredQuery = query(coleccion, orderBy("email", "asc"));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarios = respuesta;  
      console.log("usuarios obtenidos de la DB:", this.usuarios); 
    });
  }

  obtenerRolUsuario(email: string): Observable<User[]> 
  {
    const coleccion = collection(this.firestore, 'usuarios');
    const filteredQuery = query(coleccion, where("email", "==", email));
    return collectionData(filteredQuery) as Observable<User[]>;
  }
  obtenerHabilitadoUsuario(email: string): Observable<User[]> 
  {
    const coleccion = collection(this.firestore, 'usuarios');
    const filteredQuery = query(coleccion, where("email", "==", email));
    return collectionData(filteredQuery) as Observable<User[]>;
  }
  
  
}
