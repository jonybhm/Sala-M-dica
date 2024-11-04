import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private firestore: Firestore) {}

  // Método para obtener el rol de un usuario
  getUserRole(uid: string): Observable<any> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return docData(userRef);
  }
}