import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BuscarDatosUsuariosService } from '../servicios/buscar-datos-usuarios.service';
import { ErrorService } from '../servicios/error.service';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const authHabilitadoGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const buscarDatos = inject(BuscarDatosUsuariosService);
  const error = inject(ErrorService);

  if (!auth.currentUser || !auth.currentUser.email) 
  {
    error.Toast.fire({
      title: 'Usuario no logeado',
      text: 'Para ingresar debe haber iniciado sesión.',
      icon: 'info'
    });
    return of(false);
  }

  const email: string = auth.currentUser.email;

  return buscarDatos.obtenerHabilitadoUsuario(email).pipe(
    map((usuarios) => {
      const usuario = usuarios[0];
      if (usuario?.habilitado) 
      {
        return true;
      } 
      else 
      {
        console.log('Usuario no habilitado');
        error.Toast.fire({
          title: 'Acceso denegado',
          text: 'No esta habilitado por el admin.',
          icon: 'error'
        });
        return false;
      }
    }),
    catchError((err) => {
      console.error('Error al obtener info del usuario:', err);
      error.Toast.fire({
        title: 'Error de autenticación',
        text: 'No se pudo verificar.',
        icon: 'error'
      });
      return of(false);
    })
  );
};
