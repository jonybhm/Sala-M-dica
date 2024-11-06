import { Component,signal, OnInit,Output, EventEmitter } from '@angular/core';

import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { Router} from '@angular/router';
import { addDoc,collection, Firestore } from '@angular/fire/firestore';
import { LogoutService } from '../../../../servicios/logout.service';
import { ErrorService } from '../../../../servicios/error.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription ,Observable,finalize } from 'rxjs';
import { SubirImagenesService } from '../../../../servicios/subir-imagenes.service';
import { ActualizarDatosService } from '../../../../servicios/actualizar-datos.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrl: './registro-especialista.component.scss'
})
export class RegistroEspecialistaComponent implements OnInit{
  @Output() especialistaRegistrado = new EventEmitter<FormGroup>();
  constructor(
    public auth:Auth,
    private router: Router,
    public logout:LogoutService,
    private error:ErrorService,
    private firestore:Firestore, 
    private actualizarDatos:ActualizarDatosService, 
    private subirImagenStorage:SubirImagenesService
  )
  {}
  
  //================REGISTRO USUARIOS NUEVOS================
  
  
  usuarioNuevo: string = "";
  claveUsuarioNueva: string = "";
  esAdmin: boolean = false;
  usuarioLogeado: string = "";
  errorLogeo: boolean = false;
  form!: FormGroup;
  imagenPerfilUrl: string | null = null;
  imagenFile1!:any;
  imagenFile2!:any;

  ngOnInit(): void {
  
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('',[Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      edad: new FormControl('',[Validators.min(21),Validators.max(65),Validators.required]),
      documento: new FormControl('',[Validators.pattern('^[0-9]+$'),Validators.maxLength(8),Validators.required]),
      especialidad: new FormControl('',[Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      mail: new FormControl('',[Validators.email,Validators.required]),
      contrasena: new FormControl('',[Validators.pattern('^[a-zA-Z0-9*]+$'),Validators.required]),
      imagenPerfil1: new FormControl(null,[Validators.required]),
      
      })
}

get nombre() 
  {
    return this.form.get('nombre');
  }
  get apellido() 
  {
    return this.form.get('apellido');
  }
  get edad() 
  {
    return this.form.get('edad');
  }
  get documento() 
  {
    return this.form.get('documento');
  }
  get especialidad() 
  {
    return this.form.get('especialidad');
  }
  get mail() 
  {
    return this.form.get('mail');
  }
  get contrasena() 
  {
    return this.form.get('contrasena');
  }
  get imagenPerfil1() 
  {
    return this.form.get('imagenPerfil1');
  }
  
  
  hide = signal(true);
    clickEvent(event: MouseEvent) 
    {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

    subirImagen(event: Event,imagenNumero:string) 
    {

          this.imagenFile1 = (event.target as HTMLInputElement).files?.[0];
    }
  
    onRegistrar() 
    {
      if (this.form.valid)
      {
        this.especialistaRegistrado.emit(this.form);
        
        console.log("form valido y emitido");

        this.subirImagenStorage.subirImagen(this.imagenFile1,"fotoPerfilEspecialista")
        .then(url=>{
          this.form.get('imagenPerfil1')?.setValue(url);
          console.log(this.form.value.mail);
          this.actualizarDatos.actualizarDocumento('usuarios',this.form.value.mail,{imagenPerfil1:url})          
        })
        .catch(error =>{
          console.error('Error al subir la imagen:', error);
          this.error.Toast.fire({
            title: "Error al subir la imagen",
            icon: 'error'
          });
        })

      }
      else
      {
        console.log("error form invalido");
        this.error.Toast.fire(
          {
            title:"Form invalido",
            icon:'error'
          })  
      }
    }

    
    
    
    
}
