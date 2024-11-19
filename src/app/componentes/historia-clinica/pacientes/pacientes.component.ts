import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  pacienteSeleccionado: any;
  mostrarListaAtenciones: boolean = false;
  sub!: Subscription;

  constructor(
    public auth: Auth, 
    public logout: LogoutService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.obtenerPacientesFiltrados();
  }

  obtenerPacientesFiltrados() 
  {
    const especialistaMailActual = this.auth.currentUser?.email;

    if (!especialistaMailActual) 
    {
      console.warn("No se pudo obtener el email del especialista actual");
      return;
    }

    const coleccionHistorias = collection(this.firestore, 'historiasClinicas');
    const consultaHistorias = query(coleccionHistorias, where('especialistaMail', '==', especialistaMailActual));

    collectionData(consultaHistorias).subscribe((historias: any[]) => {
      const emailsPacientesRelacionados = historias.map(hc => hc.usuarioMail);

      const coleccionUsuarios = collection(this.firestore, 'usuarios');
      collectionData(coleccionUsuarios).subscribe((usuarios: any[]) => {
        this.pacientes = usuarios.filter(usuario => usuario.rol === 'paciente');
        this.pacientesFiltrados = this.pacientes.filter(paciente => 
          emailsPacientesRelacionados.includes(paciente.email)
        );
        console.log("Pacientes filtrados:", this.pacientesFiltrados);
      });
    });
  }

  seleccionar(paciente: any) 
  {
    this.pacienteSeleccionado = paciente;
    this.mostrarListaAtenciones = true;
  }

  actualizarMostrarLista(historias: any[]) 
  {
    this.mostrarListaAtenciones = historias.length > 0;
  }
}
