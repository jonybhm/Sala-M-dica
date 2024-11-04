import { Injectable } from '@angular/core';
import {Auth,signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {


  constructor(public auth: Auth, 
    private router: Router,
    public error:ErrorService) { }

 //================CERRAR SESION================

CerrarSesion(path:string)
{
  signOut(this.auth).then(()=>{
    this.router.navigate([path]);
    this.error.Toast.fire(
      {
        title:'Ha cerrado sesión',
        icon:'info'
      }
    )
    console.log(this.auth.currentUser?.email)
  }).catch((e)=>console.log(e))
}
}
