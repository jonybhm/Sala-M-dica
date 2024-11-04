import { Component,signal } from '@angular/core';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { Router} from '@angular/router';
import { addDoc,collection, Firestore } from '@angular/fire/firestore';
import { LogoutService } from '../../../servicios/logout.service';
import { ErrorService } from '../../../servicios/error.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  


  constructor(
    public auth: Auth, 
    private firestore:Firestore, 
    private router: Router,
    public logout:LogoutService,
    private error:ErrorService
  ){}
  
  //================REGISTRO USUARIOS NUEVOS================

  Registrar (path:string)
  {
    this.router.navigate([path]);
  } 


  //================LOGIN USUARIOS================
  usuario : string = '';
  claveUsuario: string = '';
  usuarioLogeado: string ='';
  errorLogeo: boolean = false;

  IniciarSesion(path: string)
  {
    signInWithEmailAndPassword(this.auth, this.usuario, this.claveUsuario).then((res)=>{
      this.errorLogeo = false;
      this.error.Toast.fire(
        {
          title:'Inicio de Sesión exitosa',
          icon:'success'
        }
      )
      this.router.navigate([path]);

    }).catch((e) => {
      this.errorLogeo = true;
      console.log(e.code);
      switch(e.code)
      {        
        case "auth/invalid-credential":
          this.error.Toast.fire(
            {
              title:'Usuario o contraseña invalidos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/invalid-email":
          this.error.Toast.fire(
            {
              title:'Email invalido',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/missing-password":
          this.error.Toast.fire(
            {
              title:'Falta contraseña',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        default:
          this.error.Toast.fire(
            {
              title:'Faltan datos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
      }
    });
  }
  
  registrarLoginsEnDB () 
   {
     let coleccion = collection(this.firestore, 'logins');
     addDoc(coleccion,{
       "Fecha": new Date(), 
       "Usuario":this.usuario
     });
   }

  //---------------ocultar contraseña---------------

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  limpiarUsuario()
  {
    this.usuario = "";
    this.claveUsuario = "";
  }

  Autocompletar(rol:string)
  {
    switch(rol)
    {
      case 'especialista':
        this.usuario = "jony.bhm@gmail.com";
        this.claveUsuario = "123456";
      break;
      case 'usuario':
        this.usuario = "jony@gmail.com";
        this.claveUsuario = "123456";
      break;
    }
  }
}
