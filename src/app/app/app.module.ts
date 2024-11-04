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
@NgModule({
  declarations: [LoginComponent, RegistroComponent,HomeComponent,RegistroEspecialistaComponent,RegistroPacienteComponent,
    PruebaComponent],
  imports: [
    CommonModule, RouterLink,FormsModule,BrowserModule,BrowserAnimationsModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,MatIconModule,MatDividerModule,MatFormFieldModule,MatInputModule,
    MatCardModule,MatListModule,MatTableModule, MatButtonToggleModule,MatLabel,MatProgressBarModule,
    MatRadioModule,MatSelectModule,MatSliderModule,MatToolbarModule,MatAutocompleteModule,MatCheckboxModule


  ]
})
export class AppModule { }
