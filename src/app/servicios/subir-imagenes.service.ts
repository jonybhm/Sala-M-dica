import { Injectable } from '@angular/core';
import {  getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { enviromentConfig } from '../../../enviromentConfig';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenesService {

  constructor(private storage:Storage) { }

  subirImagen(file:any, carpetaNombre:string)
  {
    const imgRef = ref(this.storage, `${carpetaNombre}/${file.name}`);
    uploadBytes(imgRef, file)
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
  }

  // private app = initializeApp(enviromentConfig);
  // private storage = getStorage(this.app);

  // async subirImagen(file: File, filePath: string): Promise<string> {
  //   const storageRef = ref(this.storage, filePath);

  //   try {
  //     // Sube la imagen a Firebase Storage
  //     const snapshot = await uploadBytes(storageRef, file);
  //     // Obtiene la URL de descarga de la imagen
  //     return await getDownloadURL(snapshot.ref);
  //   } catch (error) {
  //     console.error('Error subiendo la imagen:', error);
  //     throw error;
  //   }
  // }
}
