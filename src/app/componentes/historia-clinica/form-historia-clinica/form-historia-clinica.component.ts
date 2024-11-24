import { Component,OnInit,Input } from '@angular/core';

import {Auth} from '@angular/fire/auth'
import { addDoc,collection, Firestore, updateDoc, where,query,orderBy,collectionData} from '@angular/fire/firestore';
import { LogoutService } from '../../../servicios/logout.service';
import { ErrorService } from '../../../servicios/error.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';
import { routes } from '../../../app.routes';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrl: './form-historia-clinica.component.scss'
})
export class FormHistoriaClinicaComponent implements OnInit {
  usuarioPaciente!: any;
  form!: FormGroup;
  sub!: Subscription;
  
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public auth:Auth,
    public logout:LogoutService,
    private error:ErrorService,
    private firestore:Firestore, 
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<FormHistoriaClinicaComponent>
  )
  {}

  ngOnInit(): void {
    console.log(this.data.usuarioPacienteMail);
    console.log(this.data.usuarioEspecialistaMail);

    
    this.form = new FormGroup({
      altura: new FormControl('', [Validators.min(1),Validators.max(300),Validators.pattern('^[0-9]+$'),Validators.required]),
      peso: new FormControl('', [Validators.min(1),Validators.max(500),Validators.pattern('^[0-9]+$'),Validators.required]),
      temperatura: new FormControl('', [Validators.min(30),Validators.max(45),Validators.pattern('^[0-9]+$'),Validators.required]),
      presion: new FormControl('', [Validators.min(60),Validators.max(180),Validators.pattern('^[0-9]+$'),Validators.required]),
      datosDinamicos: new FormGroup({
        clave1: new FormControl(''),valor1: new FormControl(''),
        clave2: new FormControl(''),valor2: new FormControl(''),
        clave3: new FormControl(''),valor3: new FormControl('')
      })
    });
  }

  
  
  get altura() 
  {
    return this.form.get('altura');
  }
  get peso() 
  {
    return this.form.get('peso');
  }
  get temperatura() 
  {
    return this.form.get('temperatura');
  }
  get presion() 
  {
    return this.form.get('presion');
  }
  get datosDinamicos() 
  {
    return this.form.get('datosDinamicos') as FormGroup;
  }
  

  onRegistrar() {
    console.log(this.usuarioPaciente);
    if (this.form.valid) 
    {
      const userDocRef = collection(this.firestore, 'historiasClinicas');
      
      const datosDinamicos = [
        { clave: this.form.value.datosDinamicos.clave1, valor: this.form.value.datosDinamicos.valor1 },
        { clave: this.form.value.datosDinamicos.clave2, valor: this.form.value.datosDinamicos.valor2 },
        { clave: this.form.value.datosDinamicos.clave3, valor: this.form.value.datosDinamicos.valor3 }
      ].filter(d => d.clave && d.valor); 
  
      addDoc(userDocRef, {
        altura: Number(this.form.value.altura),
        peso: Number(this.form.value.peso),
        temperatura: Number(this.form.value.temperatura),
        presion: Number(this.form.value.presion),
        datosDinamicos: datosDinamicos,
        usuarioMail: this.data.usuarioPacienteMail,
        especialistaMail:this.data.usuarioEspecialistaMail,
        especialistaNombre:this.data.usuarioEspecialistaNombre,
        especialistaApellido:this.data.usuarioEspecialistaApellido,
        fecha: new Date()
      })
        .then((docRef) => {
          updateDoc(docRef, { id: docRef.id });
          console.log("Historia guardada con éxito.");
          
          this.router.navigate(['/home']);
          this.bottomSheetRef.dismiss();

        })
        .catch((error) => {
          console.error("Error al guardar la historia:", error);
        });
  
      this.error.Toast.fire({
        title: "Historia guardada",
        icon: 'success'
      });

    } 
    else
    {
      this.error.Toast.fire({
        title: "Formulario inválido",
        icon: 'error'
      });
    }
  }

  // obtenerUsuarioPacienteDB() 
  // {
  //   const coleccion = collection(this.firestore, 'usuarios');
  //   const filteredQuery = query(coleccion, where("email", "==", this.data.usuarioPacienteMail));
  //   const observable = collectionData(filteredQuery);
  
  //   this.sub = observable.subscribe((respuesta: any) => {
  //     this.usuarioPaciente = respuesta;
  //     console.log(respuesta);
  //   });
  // }
  
}
