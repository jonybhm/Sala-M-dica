import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { HomeComponent } from './componentes/general/home/home.component';
import { PruebaComponent } from './componentes/general/prueba/prueba.component';
import { authLoginGuard } from './guards/auth-login.guard';
import { authVerifyMailGuard } from './guards/auth-verify-mail.guard';
export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: "full"},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'home', component: HomeComponent},
    {path: 'prueba', component: PruebaComponent, canActivate: [authLoginGuard,authVerifyMailGuard]},
    
];
