import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges, OnChanges } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { FormatearFechaService } from '../../../servicios/formatear-fecha.service';

@Component({
  selector: 'app-tabla-turnos-especialista',
  templateUrl: './tabla-turnos-especialista.component.html',
  styleUrl: './tabla-turnos-especialista.component.scss'
})
export class TablaTurnosEspecialistaComponent implements OnInit{
  @Input() turnos: any[] = [];
  @Output() turnoSeleccionado = new EventEmitter<any>();

  turnosFiltrados:any[]=[];
  sub!: Subscription;
  filtroEspecialidad: string = '';
  filtroPaciente: string = '';

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,
    public fechaFormato:FormatearFechaService
  )
  {}   
  ngOnInit() 
  {
    this.turnosFiltrados = [...this.turnos];
  }

  filtrarTurnosEspecialista()
  {
    if (!this.filtroEspecialidad && !this.filtroPaciente) 
    {
      this.turnosFiltrados = [...this.turnos];
      console.log("TURNOS:", this.turnosFiltrados)
    } 
    else 
    {
      this.turnosFiltrados=this.turnos.filter(turno => {
        const coincideEspecialidad = turno.sectorAtencion.toLowerCase().includes(this.filtroEspecialidad.toLowerCase());
        const coincidePaciente = `${turno.pacienteNombre} ${turno.pacienteApellido}`.toLowerCase().includes(this.filtroPaciente.toLowerCase());
        return coincideEspecialidad && coincidePaciente;
      });
    }
  }
  seleccionar(turno: any) 
  {
    this.turnoSeleccionado.emit(turno);
  }


}
