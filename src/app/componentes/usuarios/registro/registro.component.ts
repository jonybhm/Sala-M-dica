import { Component,signal , OnInit} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, sendEmailVerification} from '@angular/fire/auth'
import { Router} from '@angular/router';
import { addDoc,collection, Firestore } from '@angular/fire/firestore';
import { LogoutService } from '../../../servicios/logout.service';
import { ErrorService } from '../../../servicios/error.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuscarDatosUsuariosService } from '../../../servicios/buscar-datos-usuarios.service';
import { RolUsuarioActualService } from '../../../servicios/rol-usuario.service';

@Component({
  selector: 'app-registro',

  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  constructor(
    public auth:Auth,
    private router: Router,
    public logout:LogoutService,
    private error:ErrorService,
    private firestore:Firestore, 
    private rolActual:RolUsuarioActualService

  )
  {}
  //================REGISTRO USUARIOS NUEVOS================
  
  rolUsuarioActual!:string;

  rolUsuario: string = "";
  habilitado: boolean = false;
  usuarioLogeado: string = "";
  errorLogeo: boolean = false;
  
  async ngOnInit() {
    this.rolUsuarioActual = await this.rolActual.getUserRole();
    console.log("ROL:",this.rolUsuarioActual)
  }
    
  
  //================ESPECIALISTAS================

  
  async ObtenerDatosEspecialista(especialistaForm: FormGroup)
  {   
    const res = await createUserWithEmailAndPassword(this.auth, especialistaForm.value.mail, especialistaForm.value.contrasena).then((res) => {
      if(res.user.email !== null) this.usuarioLogeado = res.user.email;
      
      
        const userDocRef = collection(this.firestore, 'usuarios');
        addDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email,
          rol: this.rolUsuario,
          nombre: especialistaForm.value.nombre,
          apellido: especialistaForm.value.apellido,
          edad: especialistaForm.value.edad,
          dni: especialistaForm.value.documento,
          especialidad: especialistaForm.value.especialidad,
          habilitado: false,
          imagenPerfil1: especialistaForm.value.imagenPerfil1
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

  //================PACIENTES================

  async ObtenerDatosPaciente(pacienteForm: FormGroup)
  {
    
    const res = await createUserWithEmailAndPassword(this.auth, pacienteForm.value.mail, pacienteForm.value.contrasena).then((res) => {
      if(res.user.email !== null) this.usuarioLogeado = res.user.email;
      
      
        const userDocRef = collection(this.firestore, 'usuarios');
        addDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email,
          rol: this.rolUsuario,
          nombre: pacienteForm.value.nombre,
          apellido: pacienteForm.value.apellido,
          edad: pacienteForm.value.edad,
          dni: pacienteForm.value.documento,
          obraSocial: pacienteForm.value.obraSocial,
          imagenPerfil1: pacienteForm.value.imagenPerfil1,
          imagenPerfil2: pacienteForm.value.imagenPerfil2,
          habilitado: true,

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

  //================ADMINS================

  
  async ObtenerDatosAdmin(especialistaForm: FormGroup)
  {   
    const res = await createUserWithEmailAndPassword(this.auth, especialistaForm.value.mail, especialistaForm.value.contrasena).then((res) => {
      if(res.user.email !== null) this.usuarioLogeado = res.user.email;
      
      
        const userDocRef = collection(this.firestore, 'usuarios');
        addDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email,
          rol: this.rolUsuario,
          nombre: especialistaForm.value.nombre,
          apellido: especialistaForm.value.apellido,
          edad: especialistaForm.value.edad,
          dni: especialistaForm.value.documento,
          imagenPerfil1: especialistaForm.value.imagenPerfil1,
          habilitado: true,
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
