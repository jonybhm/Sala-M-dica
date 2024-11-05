import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ActualizarDatosService {

  constructor(private firestore:Firestore) { }
  
  async actualizarDocumento(coleccionNombre: string, email: string, nuevosDatos: any) {
    const coleccionRef = collection(this.firestore, coleccionNombre);
    const consulta = query(coleccionRef, where('email', '==', email));
  
    // Ejecuta la consulta para obtener el documento con el email
    const snapshot = await getDocs(consulta);
    snapshot.forEach(async (docSnap) => {
      if (docSnap.exists()) {
        const docRef = docSnap.ref; // Obtiene la referencia del documento
        try {
          await updateDoc(docRef, nuevosDatos);
          console.log('Documento actualizado con éxito');
        } catch (error) {
          console.error('Error al actualizar el documento:', error);
        }
      } else {
        console.log('No se encontró ningún documento con ese email');
      }
    });
  }
  
}
