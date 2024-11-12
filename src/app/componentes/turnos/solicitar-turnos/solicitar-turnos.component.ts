import { Component, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where,updateDoc } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { ErrorService } from '../../../servicios/error.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-solicitar-turnos',
  templateUrl: './solicitar-turnos.component.html',
  styleUrl: './solicitar-turnos.component.scss'
})
export class SolicitarTurnosComponent implements OnInit{
  sub!: Subscription;
  agendas: any[] = [];
  especialistas: any[] = [];
  especialidades: any[] = [];
  turnosAsignados: any[] = [];
  fechasDisponible: any[] = [];
  pacientes: any[] = [];
  agendaActual!:any;
  usuarioActual!:any;
  pacienteActual!:any;
  especialidadActual:string = "";
  mailEspecialistaActual:string = "";
  especialistaActual!:any;
  rolUsuarioActual:string = "";

  espaciosDisponibles:any = [];
  turnoSeleccionado:boolean = false;
  fechaTurno!: Date; 
  horaTurno!: { hora: number, minutos: number };

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,
    private router: Router,
    private error:ErrorService
  
  )
  {}

  ngOnInit(): void {

    this.obtenerDatosEspecialidadesDB();
    this.obtenerRolActual();

  }

  //====================SELECCIONAR ESPECIALIDAD, ESPECIALISTA y AGENDA==========================
  obtenerDatosTurnosAsignadosDB()
  {
    const coleccion = collection(this.firestore, `turnosAsignados`);
    const filteredQuery = query(coleccion, orderBy("horario", "asc"));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.turnosAsignados = respuesta;
      console.log('TURNOS ASIGNADOS: ',respuesta);

    });
  }

  obtenerDatosEspecialidadesDB() 
  {
    const coleccion = collection(this.firestore, 'especialidades');
    const filteredQuery = query(coleccion, orderBy("especialidad", "asc"));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.especialidades = respuesta;
      
      console.log('ESPECIALIDADES: ',respuesta);
    });
  }

  onEspecialidadSeleccionada() 
  {
    const coleccion = collection(this.firestore, `usuarios`);
    const filteredQuery = query(coleccion, where(`especialidad`, "array-contains", `${this.especialidadActual}`));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.especialistas = respuesta;
    });

    this.agendaActual = null;
    this.mailEspecialistaActual = "";
    this.agendaActual = null;
  }

  onEspecialistaSeleccionado() 
  {
    this.mailEspecialistaActual = this.especialistaActual.email;
    console.log('mail especialista: ',this.mailEspecialistaActual);

    const coleccion = collection(this.firestore, `agendas`);
    const filteredQuery = query(coleccion, where(`usuarioMail`, "==", `${this.mailEspecialistaActual}`));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.agendas = respuesta;
    });

    this.agendaActual = null;
  }

  onAgendaSeleccionada()
  {
    this.espaciosDisponibles = [];
    for(let hora = this.agendaActual.horarioInicio; hora < this.agendaActual.horarioFinal; hora++  )
    {
      for(let minutos = 0; minutos < 60; minutos += this.agendaActual.duracionAtencionMinutos)
      {
        this.espaciosDisponibles.push({hora,minutos});
      }
    }

    if(this.rolUsuarioActual === 'admin')
    {
      this.obtenerListadoPacientes();
    }
    else
    {
      this.obtenerPacienteActual();
    }

    this.obtenerDatosTurnosAsignadosDB();
    this.calcularFechasTurnosDisponibles();
  }  
  
  onPacienteSeleccionado()
  {
    console.log("PACIENTE ACTUAL: ", this.pacienteActual);
  }
  //====================fechaLOG DETALLES TURNO==========================

  onClickEspacio(fecha: Date, espacio: { hora: number, minutos: number }) 
  {
    if (this.estaDisponible(fecha, espacio,this.especialistaActual.email)) {
      this.fechaTurno = fecha;
      this.horaTurno = espacio;
      this.turnoSeleccionado = true;
      this.error.Toast.fire(
        {
          title:`${fecha.toDateString()}/${espacio.hora}:${espacio.minutos} hs`,
          icon:'info'
        }
      )
    } 
    else 
    {
      this.error.Toast.fire(
        {
          title:`${fecha.toDateString()}/${espacio.hora}:${espacio.minutos} hs (NO DISPONIBLE)`,
          icon:'error'
        }
      )
    }

    console.log(this.turnosAsignados);
  
    
  }

  estaDisponible(fecha: Date, espacio: { hora: number, minutos: number }, especialistaMail : string)
  {
    const fechaNormalizada = new Date(fecha);
    fechaNormalizada.setHours(0, 0, 0, 0);

    const turnoOcupado = this.turnosAsignados.some((turno) => {
      const fechaTurnoAsignado = new Date(turno.fecha.toDate());
      fechaTurnoAsignado.setHours(0, 0, 0, 0); 

      return (
        fechaTurnoAsignado.getTime() === fechaNormalizada.getTime() &&
        turno.horario.hora === espacio.hora &&
        turno.horario.minutos === espacio.minutos && 
        turno.especialistaMail  === especialistaMail  && 
        turno.estado !== "Cancelado" &&            
        turno.estado !== "Rechazado"
      );
    });

    return !turnoOcupado;
  }
  
  estaSeleccionado(fecha: Date, espacio: { hora: number, minutos: number })
  {
    let seleccionado = false;
    if(fecha==this.fechaTurno && espacio == this.horaTurno)
    {
      seleccionado = true;
    }
    return seleccionado;
  }

  

  confirmarTurno()
  {
    const fechaSinHora = new Date(this.fechaTurno);
    fechaSinHora.setHours(0, 0, 0, 0);

    const turnosCollection = collection(this.firestore, 'turnosAsignados');
    addDoc(turnosCollection, {
      "fecha": fechaSinHora,
      "horario": this.horaTurno,
      "pacienteMail": this.pacienteActual.email,
      "pacienteNombre": this.pacienteActual.nombre,
      "pacienteApellido": this.pacienteActual.apellido,
      "sectorAtencion": this.agendaActual.sector,
      "tipoAtencion": this.agendaActual.tipoAtencion,
      "especialistaNombre": this.especialistaActual.nombre,
      "especialistaApellido": this.especialistaActual.apellido,
      "especialistaMail": this.especialistaActual.email,
      "estado": "Pendiente",
      "comentario": "",
      "calificacionAtencion": null
    }).then((docRef) => {
      console.log("Turno asignado con ID:", docRef.id);
      this.error.Toast.fire(
        {
          title:'Turno asignado',
          icon:'success'
        }
      );
      // Ahora que tenemos el ID, lo añadimos al documento.
      updateDoc(docRef, { id: docRef.id }).then(() => {
        console.log("ID agregado al documento");
      });
    }).catch((error) => {
      console.error("Error al asignar el turno:", error);
    });

    
    
  }

  

  calcularFechasTurnosDisponibles()
  {
    const fechaInicio = (this.agendaActual.fechaInicio as Timestamp).toDate();
    const fechaCierre = (this.agendaActual.fechaCierre as Timestamp).toDate();
  
    const hoy = new Date();
    const fechaDosSemanas = new Date(hoy);
    fechaDosSemanas.setDate(hoy.getDate() + 14);
  
    const fechaLimite = fechaDosSemanas < fechaCierre ? fechaDosSemanas : fechaCierre;
  
    const fechas: Date[] = [];
    let fecha = new Date(hoy);
    const diasSemana = this.agendaActual.diasSemana.map(dia => dia.toLowerCase());
    
    while (fecha <= fechaLimite) {
      const nombreDia = formatDate(fecha, 'EEEE', 'es-ES').toLowerCase();
      if (diasSemana.includes(nombreDia)) {
        fechas.push(new Date(fecha));
      }
      fecha.setDate(fecha.getDate() + 1);
    }
    
    this.fechasDisponible = fechas;
    console.log("fechaS DISPONIBLES: ", this.fechasDisponible);
  }

  obtenerRolActual() 
  {
    const coleccion = collection(this.firestore, `usuarios`);
    const filteredQuery = query(coleccion, where(`email`, "==", this.auth.currentUser?.email));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarioActual = respuesta;
      this.rolUsuarioActual = this.usuarioActual[0].rol;
      
    });


  }

  obtenerListadoPacientes() 
  {
    const coleccion = collection(this.firestore, `usuarios`);
    const filteredQuery = query(coleccion, where(`rol`, "==", 'paciente'));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.pacientes = respuesta;
    });

  }

  obtenerPacienteActual() 
  {
    const coleccion = collection(this.firestore, `usuarios`);
    const filteredQuery = query(coleccion, where(`email`, "==", this.auth.currentUser?.email));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.pacienteActual = respuesta;
      console.log("PACIENTE ACTUAL: ", this.pacienteActual);
    });

  }
}
  
 

