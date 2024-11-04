import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { ErrorService } from '../servicios/error.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const authVerifyMailGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  const router = inject(Router);
  const error = inject(ErrorService);

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) 
        {
        if (user.emailVerified) 
        {
          console.log("El usuario ha verificado su correo electrónico");
          resolve(true); // Permite el acceso
        } 
        else 
        {
          console.log("El usuario no ha verificado su correo electrónico");
          error.Toast.fire({
            title: 'Usuario no verifico su correo electrónico',
            text: 'Para ingresar debe haber verificado su mail.',
            icon: 'info',
          });
          router.navigate(['/home']);
          resolve(false); // Bloquea el acceso
        }
      } 
      else 
      {
        // El usuario no está autenticado
        console.log("El usuario no está autenticado");
        resolve(false); // Bloquea el acceso
      }
    });
  });
};

