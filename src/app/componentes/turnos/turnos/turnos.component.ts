import { Component, OnInit} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit{
  turnos: any[] = [];
  turnoSeleccionado: any;
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

  ngOnInit(): void {
    this.obtenerTurnosDB();

  }

  obtenerTurnosDB() 
  {
    const coleccion = collection(this.firestore, 'turnosAsignados');
    const filteredQuery = query(coleccion, orderBy("fecha", "asc"));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.turnos = respuesta;
      console.log("turnos:");
      console.log(this.turnos);
    });

    this.filtrarTurnos();
  }
  
  seleccionar(turno: any)
  {
    this.turnoSeleccionado = turno;
  }
  
  filtrarTurnos()
  {
    this.turnosFiltrados = this.turnos.filter(turno => {
      const coincideEspecialidad = turno.sectorAtencion.toLowerCase().includes(this.filtroEspecialidad.toLowerCase());
      const coincideEspecialista = `${turno.especialistaNombre} ${turno.especialistaApellido}`.toLowerCase().includes(this.filtroEspecialista.toLowerCase());
      return coincideEspecialidad && coincideEspecialista;
    });
  }
}
