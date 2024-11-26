import { Component,Input,SimpleChanges} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../servicios/actualizar-datos.service';
import { Timestamp } from 'firebase/firestore';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ComentarioService } from '../../../servicios/comentario.service';
import { ErrorService } from '../../../servicios/error.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormHistoriaClinicaComponent } from '../../historia-clinica/form-historia-clinica/form-historia-clinica.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { collection, where,query,collectionData} from '@angular/fire/firestore';

@Component({
  selector: 'app-turnos-especialista',
  standalone:true,
  imports:[CommonModule,MatCardModule,MatFormFieldModule,MatLabel,FormsModule,ReactiveFormsModule,MatListModule,MatInput,MatButtonModule],
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.scss'
})
export class TurnosEspecialistaComponent {
  @Input() turno: any;
  public comentario: string = '';
  public mostrarComentario: boolean = false;
  atencionesAnteriores: any[] = [];
  isLoading = true;

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore: Firestore,
    private comentarioService:ComentarioService,
    private error:ErrorService,
    private _bottomSheet:MatBottomSheet 

  )
  {}
  ngOnInit(): void {
    this.obtenerAtencionesAnteriores();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turno'] && changes['turno'].currentValue) 
    {
      this.isLoading = true; 
      this.obtenerAtencionesAnteriores();
    }
  }

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
  
  rechazarTurno()
  {
    this.mostrarComentario = true;
    this.turno.estado = 'Rechazado';
  }
  
  aceptarTurno()
  {
    this.turno.estado = 'Aceptado';
    this.actualizarTurno();
  }
  
  finalizarTurno() {
    this.mostrarComentario = true;
    this.turno.estado = 'Realizado';

    this._bottomSheet.open(FormHistoriaClinicaComponent, {
      data: { usuarioPacienteMail: this.turno.pacienteMail,
        usuarioEspecialistaMail: this.turno.especialistaMail,
        usuarioEspecialistaNombre: this.turno.especialistaNombre,
        usuarioEspecialistaApellido: this.turno.especialistaApellido,
        turnoId: this.turno.id,
       }, 
    });
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
  obtenerAtencionesAnteriores() 
  {
    if (!this.turno || !this.turno.pacienteMail)
    {
      this.isLoading = false;
      return;
    }
    const coleccion = collection(this.firestore, 'historiasClinicas');
    const consulta = query(coleccion, where('turnoId', '==', this.turno.id));
  
    collectionData(consulta).subscribe((historias) => {
      this.atencionesAnteriores = historias;
      this.isLoading = false;

    });
  }
}
