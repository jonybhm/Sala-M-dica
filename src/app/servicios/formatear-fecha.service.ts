import { Timestamp } from 'firebase/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatearFechaService {

  constructor() { }

  formatearFecha(timestamp: Timestamp)
  {
    const date = timestamp.toDate();
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  }
}
