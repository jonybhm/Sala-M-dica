import { TablaTurnosEspecialistaComponent } from '../../componentes/turnos/tabla-turnos-especialista/tabla-turnos-especialista.component';
import { TurnosEspecialistaComponent } from '../../componentes/turnos/turnos-especialista/turnos-especialista.component';
import { TurnosPacienteComponent } from '../../componentes/turnos/turnos-paciente/turnos-paciente.component';
import { TablaTurnosPacienteComponent } from '../../componentes/turnos/tabla-turnos-paciente/tabla-turnos-paciente.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosComponent } from '../../componentes/turnos/mis-turnos/mis-turnos.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatCardModule, MatFormFieldModule,MatLabel,FormsModule,ReactiveFormsModule,RouterLink,MatListModule,MatDivider
  ]
})
export class TurnosModule { }
