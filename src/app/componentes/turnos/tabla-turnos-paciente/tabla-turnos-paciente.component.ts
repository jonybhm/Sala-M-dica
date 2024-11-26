import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges, OnChanges } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { FormatearFechaService } from '../../../servicios/formatear-fecha.service';
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
  selector: 'app-tabla-turnos-paciente',
  standalone:true,
  imports:[CommonModule,MatCardModule,MatFormFieldModule,MatLabel,FormsModule,ReactiveFormsModule,MatListModule,MatInput,MatButtonModule],
  templateUrl: './tabla-turnos-paciente.component.html',
  styleUrl: './tabla-turnos-paciente.component.scss'
})
export class TablaTurnosPacienteComponent implements OnInit{
  @Input() turnos: any[] = [];
  @Output() turnoSeleccionado = new EventEmitter<any>();
  
  turnosFiltrados:any[]=[];
  historias:any[]=[];
  sub!: Subscription;
  filtroEspecialidad: string = '';
  filtroEspecialista: string = '';
  filtroHistoriaClinica: string = '';

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
    this.obtenerHistoriasDB();
  }

  filtrarTurnosPaciente() 
  {
    if (!this.filtroEspecialidad && !this.filtroEspecialista && !this.filtroHistoriaClinica) {
      this.turnosFiltrados = [...this.turnos];
    } else {
      this.turnosFiltrados = this.turnos.filter(turno => {
        const coincideEspecialidad = this.filtroEspecialidad
          ? turno.sectorAtencion.toLowerCase().includes(this.filtroEspecialidad.toLowerCase())
          : true;
        const coincideEspecialista = this.filtroEspecialista
          ? `${turno.especialistaNombre} ${turno.especialistaApellido}`.toLowerCase().includes(this.filtroEspecialista.toLowerCase())
          : true;
  

        const historiaAsociada = this.historias.find(historia => historia.turnoId === turno.id);
  
        const coincideHistoriaClinica = this.filtroHistoriaClinica
          ? historiaAsociada && (
              // Búsqueda en los datos estáticos de la historia clínica
              Object.entries(historiaAsociada).some(([key, value]) =>
                ['temperatura', 'presion', 'altura', 'peso'].includes(key) && value != null
                  ? value.toString().toLowerCase().includes(this.filtroHistoriaClinica.toLowerCase())
                  : typeof value === 'string' && value.toLowerCase().includes(this.filtroHistoriaClinica.toLowerCase())
              ) ||
              // Búsqueda en los datos dinámicos de la historia clínica
              historiaAsociada.datosDinamicos.some(dato =>
                dato.valor != null && dato.valor.toString().toLowerCase().includes(this.filtroHistoriaClinica.toLowerCase())
              )
            )
          : true;
  
        return coincideEspecialidad && coincideEspecialista && coincideHistoriaClinica;
      });
    }
  }
  
  
  
  

  filtrarHistorias() 
  {
    const correosPacientes = this.turnosFiltrados.map((t) => t.pacienteMail);
    this.historias = this.historias.filter((historia) =>
      correosPacientes.includes(historia.turno.pacienteMail)
    );
  }

  obtenerHistoriasDB() {
    const coleccion = collection(this.firestore, "historiasClinicas");
    const observable = collectionData(coleccion);
  
    this.sub = observable.subscribe((respuesta: any[]) => {
      this.historias = respuesta.map(historia => ({
        ...historia,
        datosDinamicos: historia.datosDinamicos || []
      }));
      console.log("HISTORIAS CARGADAS:", this.historias);
    });
  }
  
  
  
  
  seleccionar(turno: any) 
  {
    this.turnoSeleccionado.emit(turno);
  }
  
}
