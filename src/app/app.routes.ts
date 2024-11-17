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
import { AnimationComponent } from './componentes/animations/animation/animation.component';
import { AnimationListComponent } from './componentes/animations/animation-list/animation-list.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';

export const routes: Routes = [
    {path: '', redirectTo: 'bienvenida', pathMatch: "full"},
    {path: 'animation', component: AnimationComponent, data: { animation: 'animation' }},
    {path: 'listAnimation', component: AnimationListComponent, data: { animation: 'listAnimation' } },
    {path: 'login', component: LoginComponent, data: { animation: 'login' }},
    {path: 'bienvenida', component: BienvenidaComponent, data: { animation: 'bienvenida' }},
    {path: 'miPerfil', component: MiPerfilComponent, canActivate: [authLoginGuard], data: { animation: 'miPerfil' }},
    {path: 'solicitarTurnos', component: SolicitarTurnosComponent, canActivate: [authLoginGuard], data: { animation: 'solicitarTurnos' }},
    {path: 'misTurnos', component: MisTurnosComponent, canActivate: [authLoginGuard], data: { animation: 'misTurnos' }},
    {path: 'historiaClinica', component: HistoriaClinicaComponent, canActivate: [authLoginGuard], data: { animation: 'historiaClinica' }},
    {path: 'turnos', component: TurnosComponent, canActivate: [authLoginGuard,authAdminGuard], data: { animation: 'turnos' }},
    {path: 'registro', component: RegistroComponent, data: { animation: 'registro' }},
    {path: 'home', component: HomeComponent, canActivate: [authVerifyMailGuard,authHabilitadoGuard], data: { animation: 'home' }},
    {path: 'prueba', component: PruebaComponent, canActivate: [authLoginGuard,authVerifyMailGuard,authHabilitadoGuard], data: { animation: 'prueba' }},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [authLoginGuard,authVerifyMailGuard,authAdminGuard,authHabilitadoGuard], data: { animation: 'usuarios' }},
    
];
