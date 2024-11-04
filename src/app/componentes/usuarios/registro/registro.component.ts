import { Component,signal } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, sendEmailVerification} from '@angular/fire/auth'
import { Router} from '@angular/router';
import { addDoc,collection, Firestore } from '@angular/fire/firestore';
import { LogoutService } from '../../../servicios/logout.service';
import { ErrorService } from '../../../servicios/error.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';







@Component({
  selector: 'app-registro',

  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
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
  rolUsuario: string = "";
  nombreNuevo: string ="";
  apellidoNuevo: string ="";
  edadNuevo: string ="";
  dniNuevo: string ="";

  usuarioLogeado: string = "";
  errorLogeo: boolean = false;
  
  async ObtenerDatosEspecialista(especialistaForm: FormGroup)
  {
    this.usuarioNuevo = especialistaForm.value.mail;
    this.claveUsuarioNueva = especialistaForm.value.contrasena;
    this.nombreNuevo = especialistaForm.value.nombre;
    this.apellidoNuevo = especialistaForm.value.apellido;
    
    await createUserWithEmailAndPassword(this.auth, this.usuarioNuevo, this.claveUsuarioNueva).then((res) => {
      if(res.user.email !== null) this.usuarioLogeado = res.user.email;
      
      
        const userDocRef = collection(this.firestore, 'usuariosEspecialistas');
        addDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email,
          rol: this.rolUsuario,
          nombre: this.nombreNuevo,
          apellido: this.apellidoNuevo,
        });  

      sendEmailVerification(res.user)
      .then(() => {
        console.log("Correo electrónico de verificación enviado.");
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico de verificación:", error);
      });
      
      this.errorLogeo = false;
      this.error.Toast.fire(
        {
          title:'Usuario creado con éxito',
          icon:'success'
        }
      )
      this.router.navigate(['/home']);
    }).catch((e) => {
      this.errorLogeo = true;
  
      switch(e.code)
      {
        case "auth/invalid-email":
          this.error.Toast.fire(
          {
            title:"Email invalido",
            icon:'error'
          })  
        break;
        case "auth/email-already-in-use":
          this.error.Toast.fire(
          {
            title:"Email ya se encuentra en uso",
            icon:'error'
          })  
        break;
        case "auth/invalid-password":
          this.error.Toast.fire(
          {
            title:"Contraseña invalida",
            icon:'error'
          })  
        break;
        case "auth/weak-password":
          this.error.Toast.fire(
          {
            title:"Contraseña muy débil",
            icon:'error'
          })  
        break;        
        default:
          this.error.Toast.fire(
          {
            title:'Error en el registro',
            icon:'error'
          })  
        break;
      }
    });  
  }
  
  
  hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }
  
}
