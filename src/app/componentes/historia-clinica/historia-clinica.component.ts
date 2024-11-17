import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LogoutService } from '../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { query, collection, Firestore, orderBy, collectionData, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.scss'
})
export class HistoriaClinicaComponent {
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
