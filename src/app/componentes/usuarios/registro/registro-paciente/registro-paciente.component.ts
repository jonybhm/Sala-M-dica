import { Component,signal } from '@angular/core';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { Router} from '@angular/router';
import { addDoc,collection, Firestore } from '@angular/fire/firestore';
import { LogoutService } from '../../../../servicios/logout.service';
import { ErrorService } from '../../../../servicios/error.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrl: './registro-paciente.component.scss'
})
export class RegistroPacienteComponent {
  constructor(
    public auth:Auth,
    private router: Router,
    public logout:LogoutService,
    private error:ErrorService,
    private firestore:Firestore, 

  )
  {}
  
  //================REGISTRO USUARIOS NUEVOS================
  
  
  usuarioNuevo: string = "";
  claveUsuarioNueva: string = "";
  esAdmin: boolean = false;
  usuarioLogeado: string = "";
  errorLogeo: boolean = false;
  
  

  hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

}
