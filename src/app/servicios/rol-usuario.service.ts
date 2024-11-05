import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { query, where, getDocs, collection } from '@angular/fire/firestore';

interface User 
{
  email: string;
  rol: string;
}


@Injectable({
  providedIn: 'root',
})
export class RolUsuarioActualService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  async getUserRole(): Promise<string> {
    const currentUser = this.auth.currentUser;
  
    if (currentUser) {
      const usuariosRef = collection(this.firestore, 'usuarios');
      const q = query(usuariosRef, where('uid', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Toma el primer documento encontrado
        const userData = userDoc.data() as { rol?: string };
        console.log("UID: ", currentUser.uid);
        console.log("ROL SERVICIO: ", userData?.rol);
  
        // Devuelve el rol si existe, de lo contrario, un valor por defecto
        return userData?.rol || 'invitado';
      } else {
        console.error(`No se encontró un documento con UID: ${currentUser.uid}`);
      }
    }
  
    // Valor por defecto si el usuario no está autenticado o no se encontró el documento
    return 'invitado';
  }
}