import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { HomeComponent } from './componentes/general/home/home.component';
import { PruebaComponent } from './componentes/general/prueba/prueba.component';
import { authLoginGuard } from './guards/auth-login.guard';
import { authVerifyMailGuard } from './guards/auth-verify-mail.guard';
import { UsuariosComponent } from './componentes/usuarios/usuarios/usuarios.component';
import { authAdminGuard } from './guards/auth-admin.guard';
import { authHabilitadoGuard } from './guards/auth-habilitado.guard';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { MiPerfilComponent } from './componentes/usuarios/mi-perfil/mi-perfil.component';
import { SolicitarTurnosComponent } from './componentes/turnos/solicitar-turnos/solicitar-turnos.component';
import { MisTurnosComponent } from './componentes/turnos/mis-turnos/mis-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos/turnos.component';

export const routes: Routes = [
    {path: '', redirectTo: 'bienvenida', pathMatch: "full"},
    {path: 'login', component: LoginComponent},
    {path: 'bienvenida', component: BienvenidaComponent},
    {path: 'miPerfil', component: MiPerfilComponent, canActivate: [authLoginGuard]},
    {path: 'solicitarTurnos', component: SolicitarTurnosComponent, canActivate: [authLoginGuard]},
    {path: 'misTurnos', component: MisTurnosComponent, canActivate: [authLoginGuard]},
    {path: 'turnos', component: TurnosComponent, canActivate: [authLoginGuard,authAdminGuard]},
    {path: 'registro', component: RegistroComponent},
    {path: 'home', component: HomeComponent, canActivate: [authVerifyMailGuard,authHabilitadoGuard]},
    {path: 'prueba', component: PruebaComponent, canActivate: [authLoginGuard,authVerifyMailGuard,authHabilitadoGuard]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [authLoginGuard,authVerifyMailGuard,authAdminGuard,authHabilitadoGuard]},
    
];
