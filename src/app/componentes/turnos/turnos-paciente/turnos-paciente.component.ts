import { Component,Input} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../servicios/actualizar-datos.service';
import { Timestamp } from 'firebase/firestore';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ComentarioService } from '../../../servicios/comentario.service';
import { ErrorService } from '../../../servicios/error.service';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrl: './turnos-paciente.component.scss'
})
export class TurnosPacienteComponent {
  @Input() turno: any;
  public calificacion: string = '';
  

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
    this.turno.estado = 'Cancelado';
    this.actualizarTurno();
  }
  
 
  verComentario()
  {
    this.comentarioService.MostrarCOmentario('Comentario',this.turno.comentario);
  }
  verCalificacion()
  {
    this.comentarioService.MostrarCOmentario('Calificacion',this.turno.calificacion);
  }
  guardarCalificacion()
  {
    if (this.calificacion.trim()) 
    {
      this.turno.calificacion = this.calificacion;
      this.actualizarTurno();
      this.calificacion = '';
    } 
    else 
    {
      this.error.Toast.fire(
        {
          title:"Falta agregar una calificacion",
          icon:'error'
        })  
    }
  }

  actualizarTurno()
  {
    const turnoDoc = doc(this.firestore, `turnosAsignados/${this.turno.id}`);
    updateDoc(turnoDoc, {
      estado: this.turno.estado,
      calificacionAtencion: this.turno.calificacion || '',
    }).then(() => {
      console.log('Turno actualizado exitosamente.');
    }).catch(error => {
      console.error('Error al actualizar el turno:', error);
    });
  }

}
