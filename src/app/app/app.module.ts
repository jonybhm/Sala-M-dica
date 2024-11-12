import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatLabel } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppComponent } from '../app.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LoginComponent } from '../componentes/usuarios/login/login.component';
import { RegistroComponent } from '../componentes/usuarios/registro/registro.component';
import { HomeComponent } from '../componentes/general/home/home.component';
import { PruebaComponent } from '../componentes/general/prueba/prueba.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistroEspecialistaComponent } from '../componentes/usuarios/registro/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from '../componentes/usuarios/registro/registro-paciente/registro-paciente.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsuariosComponent } from '../componentes/usuarios/usuarios/usuarios.component';
import { DetalleUsuariosComponent } from '../componentes/usuarios/usuarios/detalle-usuarios/detalle-usuarios.component';
import { TablaUsuariosComponent } from '../componentes/usuarios/usuarios/tabla-usuarios/tabla-usuarios.component';
import { RegistroAdminComponent } from '../componentes/usuarios/registro/registro-admin/registro-admin.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BienvenidaComponent } from '../componentes/bienvenida/bienvenida.component';
import { MiPerfilComponent } from '../componentes/usuarios/mi-perfil/mi-perfil.component';
import { SolicitarTurnosComponent } from '../componentes/turnos/solicitar-turnos/solicitar-turnos.component';
import { MisTurnosComponent } from '../componentes/turnos/mis-turnos/mis-turnos.component';
import {MatMenuModule} from '@angular/material/menu';
import { TurnosAdminComponent } from '../componentes/turnos/turnos-admin/turnos-admin.component';
import { TurnosEspecialistaComponent } from '../componentes/turnos/turnos-especialista/turnos-especialista.component';
import { TurnosPacienteComponent } from '../componentes/turnos/turnos-paciente/turnos-paciente.component';
import { TurnosComponent } from '../componentes/turnos/turnos/turnos.component';
import { TablaTurnosEspecialistaComponent } from '../componentes/turnos/tabla-turnos-especialista/tabla-turnos-especialista.component';
import { TablaTurnosPacienteComponent } from '../componentes/turnos/tabla-turnos-paciente/tabla-turnos-paciente.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [LoginComponent, RegistroComponent,HomeComponent,RegistroEspecialistaComponent,RegistroPacienteComponent,SolicitarTurnosComponent,
    PruebaComponent,UsuariosComponent,DetalleUsuariosComponent,TablaUsuariosComponent,RegistroAdminComponent, BienvenidaComponent,MiPerfilComponent,
  MisTurnosComponent, TurnosAdminComponent,TurnosEspecialistaComponent,TurnosPacienteComponent,TurnosComponent,
  TablaTurnosEspecialistaComponent,TablaTurnosPacienteComponent],
  imports: [
    CommonModule, RouterLink,FormsModule,BrowserModule,BrowserAnimationsModule,ReactiveFormsModule,
    MatDatepickerModule,MatMenuModule,NgxCaptchaModule,
    MatButtonModule,MatIconModule,MatDividerModule,MatFormFieldModule,MatInputModule,MatProgressBar,MatTableModule,
    MatCardModule,MatListModule,MatTableModule, MatButtonToggleModule,MatLabel,MatProgressBarModule,MatProgressSpinnerModule,
    MatRadioModule,MatSelectModule,MatSliderModule,MatToolbarModule,MatAutocompleteModule,MatCheckboxModule, 
    
  ]
})
export class AppModule { }
