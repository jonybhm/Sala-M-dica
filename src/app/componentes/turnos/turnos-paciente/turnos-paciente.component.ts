import { Component,Input} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../servicios/actualizar-datos.service';
import { Timestamp } from 'firebase/firestore';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ComentarioService } from '../../../servicios/comentario.service';
import { ErrorService } from '../../../servicios/error.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-turnos-paciente',
  standalone:true,
  imports:[CommonModule,MatCardModule,MatFormFieldModule,MatLabel,FormsModule,ReactiveFormsModule,MatListModule,MatInput,MatButtonModule],
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
