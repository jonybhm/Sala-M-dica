import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, collectionData,where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  
  constructor(private firestore: Firestore) {}
  
  

}
