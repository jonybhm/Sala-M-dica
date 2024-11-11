import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges, OnChanges } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';


@Component({
  selector: 'app-tabla-turnos-paciente',
  templateUrl: './tabla-turnos-paciente.component.html',
  styleUrl: './tabla-turnos-paciente.component.scss'
})
export class TablaTurnosPacienteComponent {
  @Input() turnos: any[] = [];
  @Output() turnoSeleccionado = new EventEmitter<any>();
  
  
  sub!: Subscription;
  turnosFiltrados: any[] = [];
  filtroEspecialidad: string = '';
  filtroEspecialista: string = '';

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,
  )
  {}   
  

  filtrarTurnosPaciente()
  {
    this.turnosFiltrados = this.turnos.filter(turno => {
      const coincideEspecialidad = turno.sectorAtencion.toLowerCase().includes(this.filtroEspecialidad.toLowerCase());
      const coincideEspecialista = `${turno.especialistaNombre} ${turno.especialistaApellido}`.toLowerCase().includes(this.filtroEspecialista.toLowerCase());
      return coincideEspecialidad && coincideEspecialista;
    });
  }

  seleccionar(turno: any) 
  {
    this.turnoSeleccionado.emit(turno);
  }
}
