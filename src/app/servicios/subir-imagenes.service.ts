import { Injectable, OnInit } from '@angular/core';
import {  getStorage, ref, uploadBytes, getDownloadURL , listAll} from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { enviromentConfig } from '../../../enviromentConfig';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenesService implements OnInit{

  constructor(private storage:Storage) { }

  ngOnInit(): void {
    //this.getImages();
  }

  subirImagen(file: any, carpetaNombre: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const imgRef = ref(this.storage, `${carpetaNombre}/${file.name}`);
      
      uploadBytes(imgRef, file)
        .then(async response => {
          const url = await getDownloadURL(response.ref);
          console.log('URL de descarga:', url);
          resolve(url);
        })
        .catch(error => {
          console.log('Error al subir la imagen:', error);
          reject(error);
        });
    });
  }
  
  
}
