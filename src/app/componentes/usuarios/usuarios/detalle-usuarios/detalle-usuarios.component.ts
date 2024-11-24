import { Component,Input,OnChanges, SimpleChanges} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../../servicios/actualizar-datos.service';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FormatearFechaService } from '../../../../servicios/formatear-fecha.service';
@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrl: './detalle-usuarios.component.scss'
})
export class DetalleUsuariosComponent {
  @Input() usuario: any;
  turnosUsuario: any[] = [];
  sub!: Subscription;
  isLoading = true;

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private actualizarDatosService: ActualizarDatosService,
    private firestore: Firestore,
    public fechaFormato:FormatearFechaService

  )
  {}
  ngOnInit(): void {

    if(this.usuario)
    {
      this.obtenerTurnosDB();  
    }
    else
    {
      console.log("NO SE SELECCIONO USUARIO");
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && changes['usuario'].currentValue) 
    {
      this.isLoading = true; 
      this.obtenerTurnosDB();
    }
  }

  onHabilitadoChange() 
  {
    const nuevosDatos = { habilitado: this.usuario.habilitado };
    
    this.actualizarDatosService.actualizarDocumento('usuarios', this.usuario.email, nuevosDatos)
      .then(() => console.log('Estado de habilitado actualizado con éxito'))
      .catch(error => console.error('Error al actualizar el estado de habilitado:', error));
  }

  obtenerTurnosDB() 
  {
    if (!this.usuario || !this.usuario.email)
      {
        this.isLoading = false;
        return;
      }

    const coleccion = collection(this.firestore, 'turnosAsignados');
    const filteredQuery = query(coleccion, where("pacienteMail","==",this.usuario.email ));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.turnosUsuario = respuesta;
      console.log("TURNOS USUARIO:",this.turnosUsuario);
      this.isLoading = false;

    });
  }
}
