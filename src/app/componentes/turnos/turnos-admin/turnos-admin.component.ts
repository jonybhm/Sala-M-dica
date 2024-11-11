import { Component,Input} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../servicios/actualizar-datos.service';
import { Timestamp } from 'firebase/firestore';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ComentarioService } from '../../../servicios/comentario.service';
import { ErrorService } from '../../../servicios/error.service';


@Component({
  selector: 'app-turnos-admin',
  templateUrl: './turnos-admin.component.html',
  styleUrl: './turnos-admin.component.scss'
})
export class TurnosAdminComponent {
  @Input() turno: any;
  public comentario: string = '';
  public mostrarComentario: boolean = false;
  

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore: Firestore,
    private comentarioService:ComentarioService,
    private error:ErrorService,
  )
  {}
  formatearFecha(timestamp: Timestamp)
  {
    const date = timestamp.toDate();
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  }
  cancelarTurno()
  {
    this.mostrarComentario = true;
    this.turno.estado = 'Cancelado';
  }

  verComentario()
  {
    this.comentarioService.MostrarCOmentario('Comentario',this.turno.comentario);
  }
  
  guardarComentario()
  {
    if (this.comentario.trim()) 
    {
      this.turno.comentario = this.comentario;
      this.actualizarTurno();
      this.mostrarComentario = false;
      this.comentario = '';
    } 
    else 
    {
      this.error.Toast.fire(
        {
          title:"Falta agregar un comentario",
          icon:'error'
        })  
    }
  }

  actualizarTurno()
  {
    const turnoDoc = doc(this.firestore, `turnosAsignados/${this.turno.id}`);
    updateDoc(turnoDoc, {
      estado: this.turno.estado,
      comentario: this.turno.comentario || '',
    }).then(() => {
      console.log('Turno actualizado exitosamente.');
    }).catch(error => {
      console.error('Error al actualizar el turno:', error);
    });
  }

}
