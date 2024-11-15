import { Component,OnInit,Input } from '@angular/core';

import {Auth} from '@angular/fire/auth'
import { addDoc,collection, Firestore, updateDoc,query, orderBy, collectionData,where} from '@angular/fire/firestore';
import { LogoutService } from '../../../servicios/logout.service';
import { ErrorService } from '../../../servicios/error.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription ,Observable,finalize } from 'rxjs';
import { SubirImagenesService } from '../../../servicios/subir-imagenes.service';
import { ActualizarDatosService } from '../../../servicios/actualizar-datos.service';
import { OpcionesService } from '../../../servicios/opciones.service';
import { Router} from '@angular/router';



@Component({
  selector: 'app-registro-agenda',
  templateUrl: './registro-agenda.component.html',
  styleUrl: './registro-agenda.component.scss'
})
export class RegistroAgendaComponent implements OnInit{
  @Input() usuario: any;
  form!: FormGroup;
  sub!: Subscription;
  imagenSector:string="";
  constructor(
    public auth:Auth,
    public logout:LogoutService,
    private error:ErrorService,
    private router: Router,
    private firestore:Firestore, 
  )
  {}

  ngOnInit(): void {
  
    this.form = new FormGroup({
      
      duracionAtencionMinutos: new FormControl('',[Validators.min(10),Validators.max(30),Validators.required]),
      horarioInicio: new FormControl('',[Validators.min(7),Validators.max(18),Validators.pattern('^[0-9]+$'),Validators.required]),
      horarioFinal: new FormControl('',[Validators.min(7),Validators.max(18),Validators.pattern('^[0-9]+$'),Validators.required]),
      sector: new FormControl('',[Validators.required]),
      tipoAtencion: new FormControl('',[Validators.pattern('^[a-zA-Z0-9*]+$'),Validators.required]),
      fechaInicio: new FormControl(null,[Validators.required]),
      fechaCierre: new FormControl(null,[Validators.required]),
      diasSemana: new FormControl([],[Validators.required,Validators.minLength(1)]),
      });
  }

  
  get duracionAtencionMinutos() 
  {
    return this.form.get('duracionAtencionMinutos');
  }
  get horarioInicio() 
  {
    return this.form.get('horarioInicio');
  }
  get horarioFinal() 
  {
    return this.form.get('horarioFinal');
  }
  get sector() 
  {
    return this.form.get('sector');
  }
  get tipoAtencion() 
  {
    return this.form.get('tipoAtencion');
  }

  get fechaInicio() 
  {
    return this.form.get('fechaInicio');
  }
  get fechaCierre() 
  {
    return this.form.get('fechaCierre');
  }
  get diasSemana() 
  {
    return this.form.get('diasSemana');
  }

  onRegistrar() 
  {
    if (this.form.valid)
    {    
      this.obtenerImagenEspecialidad(this.form.value.sector);

      const userDocRef = collection(this.firestore, 'agendas');
        addDoc(userDocRef, {
         
          duracionAtencionMinutos: this.form.value.duracionAtencionMinutos,
          horarioInicio: Number(this.form.value.horarioInicio),
          horarioFinal:  Number(this.form.value.horarioFinal),
          sector: this.form.value.sector,
          tipoAtencion: this.form.value.tipoAtencion,
          usuarioMail:this.usuario.email,
          fechaInicio:this.form.value.fechaInicio,
          fechaCierre:this.form.value.fechaCierre,
          diasSemana:this.form.value.diasSemana,
          imagen:this.imagenSector
        })
        .then((docRef) => {
          updateDoc(docRef, { id: docRef.id }).then(() => {
            console.log("ID agenda agregado al documento");
          });
        })
        .catch((error) => {
          console.error(error);
        }
      );  
      console.log("form valido y guardado");     
      this.error.Toast.fire(
        {
          title:"Agenda guardada",
          icon:'success'
        })  
        this.router.navigate(["/home"]);

    }
    else
    {
      console.log("error form invalido");
      this.error.Toast.fire(
        {
          title:"Agenda invalida",
          icon:'error'
        })  
    }
  }
  

  obtenerImagenEspecialidad(nombreEspecialidad:string) 
  {
    const coleccion = collection(this.firestore, `especialidades`);
    const filteredQuery = query(coleccion, where(`especialidad`, "==", nombreEspecialidad));
    const observable = collectionData(filteredQuery);
    this.sub = observable.subscribe((respuesta: any) => {
      this.imagenSector = respuesta.especialidad;     
      
    });


  }
}
