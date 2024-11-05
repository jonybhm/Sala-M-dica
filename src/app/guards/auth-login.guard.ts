import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {Auth, signOut} from '@angular/fire/auth'
import { ErrorService } from '../servicios/error.service';
export const authLoginGuard: CanActivateFn = (route, state) => {
 
  const auth = inject(Auth);
  const router = inject(Router);
  const error = inject(ErrorService);

  if(auth.currentUser) 
  {
    console.log("Puede acceder, usuario logeado");
    return true
  }
  else
  {
    console.log("No Puede acceder, usuario NO logeado");
    error.Toast.fire(
      {
        title:'Usuario no logeado',
        text:'Para ingresar debe haber iniciado sesión.',
        icon:'info'
      }
    )
    router.navigate(['/login']);
    return  false;
  }
};