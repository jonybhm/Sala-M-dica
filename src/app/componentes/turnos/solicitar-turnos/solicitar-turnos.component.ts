import { Component, OnInit} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { TurnoDialogComponent } from '../turno-dialog/turno-dialog.component';
@Component({
  selector: 'app-solicitar-turnos',
  templateUrl: './solicitar-turnos.component.html',
  styleUrl: './solicitar-turnos.component.scss'
})
export class SolicitarTurnosComponent implements OnInit{
  sub!: Subscription;
  agendas: any[] = [];
  usuarios: any[] = [];
  especialidades: any[] = [];
  agendaActual!:any;
  especialidadActual:string = "";
  mailEspecialistaActual:string = "";
  espaciosDisponibles:any = [];


  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,
    private dialog: MatDialog
  )
  {}

  ngOnInit(): void {

    this.obtenerDatosEspecialidadesDB();
    console.log('ESPECIALIDADES: ',this.especialidades);  
    

  }

  //====================SELECCIONAR ESPECIALIDAD, ESPECIALISTA y AGENDA==========================
  obtenerDatosEspecialidadesDB() 
  {
    const coleccion = collection(this.firestore, 'especialidades');
    const filteredQuery = query(coleccion, orderBy("especialidad", "asc"));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.especialidades = respuesta;
      
      console.log('RESPUESTA: ',respuesta);
    });
  }

  onEspecialidadSeleccionada() 
  {
    const coleccion = collection(this.firestore, `usuarios`);
    const filteredQuery = query(coleccion, where(`especialidad`, "==", `${this.especialidadActual}`));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarios = respuesta;
    });
  }

  onEspecialistaSeleccionado() 
  {
    console.log('mail especialista: ',this.mailEspecialistaActual);

    const coleccion = collection(this.firestore, `agendas`);
    const filteredQuery = query(coleccion, where(`usuarioMail`, "==", `${this.mailEspecialistaActual}`));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.agendas = respuesta;
    });
  }

  onAgendaSeleccionada()
  {
    for(let hora = this.agendaActual.horarioInicio; hora < this.agendaActual.horarioFinal; hora++  )
      {
        for(let minutos = 0; minutos < 60; minutos += this.agendaActual.duracionAtencionMinutos)
        {
          this.espaciosDisponibles.push({hora,minutos});
        }
      }
  }  
  

  //====================DIALOG DETALLES TURNO==========================

  onClickEspacio(dia: string, espacio: { hora: number, minutos: number }) 
  {
    const dialogRef = this.dialog.open(TurnoDialogComponent, {
      data: { dia, espacio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const turnosCollection = collection(this.firestore, 'turnosAsignados');
        addDoc(turnosCollection, {
          dia,
          espacio,
        }).then(() => {
          console.log("Turno asignado");
        });
      }
    });
  }

  estaDisponible(dia: string, espacio: { hora: number, minutos: number }) 
  {
    return true;  
  }
  
  estaAsignado(dia: string, espacio: { hora: number, minutos: number })
  {
    return false;
  }

  



  
}

