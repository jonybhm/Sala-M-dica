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
  sub!: Subscription;
  filtroEspecialidad: string = '';
  filtroEspecialista: string = '';

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

  filtrarTurnosPaciente() 
  {
    if (!this.filtroEspecialidad && !this.filtroEspecialista) 
    {
      this.turnosFiltrados = [...this.turnos];
      console.log("TURNOS:", this.turnosFiltrados)
    } 
    else 
    {
      this.turnosFiltrados = this.turnos.filter(turno => {
        const coincideEspecialidad = turno.sectorAtencion.toLowerCase().includes(this.filtroEspecialidad.toLowerCase());
        const coincideEspecialista = `${turno.especialistaNombre} ${turno.especialistaApellido}`.toLowerCase().includes(this.filtroEspecialista.toLowerCase());
        return coincideEspecialidad && coincideEspecialista;
      });
    }
  }
  seleccionar(turno: any) 
  {
    this.turnoSeleccionado.emit(turno);
  }

  
}
