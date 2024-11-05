import { Component,Input} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../../servicios/logout.service';
import { ActualizarDatosService } from '../../../../servicios/actualizar-datos.service';
@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrl: './detalle-usuarios.component.scss'
})
export class DetalleUsuariosComponent {
  @Input() usuario: any;

  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private actualizarDatosService: ActualizarDatosService
  )
  {}

  onHabilitadoChange() 
  {
    const nuevosDatos = { habilitado: this.usuario.habilitado };
    
    this.actualizarDatosService.actualizarDocumento('usuarios', this.usuario.email, nuevosDatos)
      .then(() => console.log('Estado de habilitado actualizado con éxito'))
      .catch(error => console.error('Error al actualizar el estado de habilitado:', error));
  }
}
