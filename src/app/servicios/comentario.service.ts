import { Injectable } from '@angular/core';
import Swal  from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor() { }

  //================ALERTAS================
  MostrarCOmentario(titulo:string, texto:string)
  {
    Swal.fire({
      title: `${titulo}`,
      text: `${texto}`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    })

  }
}