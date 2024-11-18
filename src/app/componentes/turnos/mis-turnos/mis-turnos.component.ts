import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { query, collection, Firestore, orderBy, collectionData, where } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { TurnosEspecialistaComponent } from '../turnos-especialista/turnos-especialista.component';
import { TurnosPacienteComponent } from '../turnos-paciente/turnos-paciente.component';
import { TablaTurnosEspecialistaComponent } from '../tabla-turnos-especialista/tabla-turnos-especialista.component';
import { TablaTurnosPacienteComponent } from '../tabla-turnos-paciente/tabla-turnos-paciente.component';

@Component({
  selector: 'app-mis-turnos',
  standalone:true,
  imports:[CommonModule,MatCardModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatListModule,
    TurnosEspecialistaComponent,TurnosPacienteComponent,TablaTurnosEspecialistaComponent,TablaTurnosPacienteComponent],
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {
  subEsp!: Subscription;
  subPac!: Subscription;
  sub!: Subscription;
  usuarioActual!: any;
  rolUsuarioActual: string = '';
  turnoSeleccionado!: any;
  turnosEspecialista: any[] = [];
  turnosPaciente: any[] = [];
  turnos: any[] = [];
  isLoading = true;
  
  constructor(
    public auth: Auth,
    public logout: LogoutService,
    private firestore: Firestore,
  ) {}

  ngOnInit(): void {
    this.obtenerRolActual();
    this.obtenerTurnosDB();
  }

  seleccionar(turno: any) {
    this.turnoSeleccionado = turno;
  }

  obtenerTurnosDB() {
    const coleccion = collection(this.firestore, `turnosAsignados`);
    const filteredQuery = query(coleccion, orderBy(`fecha`, "asc"));
    const observable = collectionData(filteredQuery);

    this.subEsp = observable.subscribe((respuesta: any) => {
      this.turnos = respuesta;
      console.log("TURNOS:", this.turnos);
      this.filtrarTurnos();

      this.isLoading = false;
    });
  }

  obtenerRolActual() {
    const coleccion = collection(this.firestore, `usuarios`);
    const filteredQuery = query(coleccion, where(`email`, "==", this.auth.currentUser?.email));
    const observable = collectionData(filteredQuery);

    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarioActual = respuesta;
      this.rolUsuarioActual = this.usuarioActual[0].rol;
    });
  }

  filtrarTurnos() {
    this.turnosEspecialista = [];
    this.turnosPaciente = [];

    this.turnos.forEach(turno => {
      if (turno.especialistaMail === this.auth.currentUser?.email) {
        this.turnosEspecialista.push(turno);
      }
      if (turno.pacienteMail === this.auth.currentUser?.email) {
        this.turnosPaciente.push(turno);
      }
    });
  }
}
