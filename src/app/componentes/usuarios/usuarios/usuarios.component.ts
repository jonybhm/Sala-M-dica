import { Component, OnInit} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { Subscription } from 'rxjs';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { FormatearFechaService } from '../../../servicios/formatear-fecha.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  usuarios: any[] = [];
  turnosUsuario: any[] = [];
  usuarioSeleccionado: any;
  sub!: Subscription;
  
  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private firestore:Firestore,
    public fechaFormato:FormatearFechaService

  )
  {}

  ngOnInit(): void {
    this.obtenerUsuariosDB();
  }

  obtenerUsuariosDB() 
  {
    const coleccion = collection(this.firestore, 'usuarios');
    const filteredQuery = query(coleccion, orderBy("email", "asc"));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.usuarios = respuesta;
      console.log("USUARIOS:",this.usuarios);
    });
  }
  
  seleccionar(usuario: any)
  {
    this.usuarioSeleccionado = usuario;
    this.obtenerTurnosPacienteAdminDB();
  }

  obtenerTurnosPacienteAdminDB() 
  {
    const coleccion = collection(this.firestore, 'turnosAsignados');
    const filteredQuery = query(coleccion, where("pacienteMail","==",this.usuarioSeleccionado.email ));
    const observable = collectionData(filteredQuery);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.turnosUsuario = respuesta;
      console.log("TURNOS USUARIO:",this.turnosUsuario);
      this.descargarExcelTurnos();
    });
  }

  descargarExcel() 
  {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

    worksheet.columns = [
      { header: 'Email', key: 'email'},
      { header: 'Apellido', key: 'apellido'},
      { header: 'Nombre', key: 'nombre'},
      { header: 'Documento', key: 'dni'},
      { header: 'Edad', key: 'edad'},
      { header: 'Rol', key: 'rol'},
    ];

    this.usuarios.forEach((usuario) => {
      worksheet.addRow({
        email: usuario.email,
        apellido: usuario.apellido,
        nombre: usuario.nombre,
        dni: usuario.dni,
        edad: usuario.edad,
        rol: usuario.rol,
      });
    });      

    workbook.xlsx.writeBuffer().then((buffer) => {
      fs.saveAs(new Blob([buffer]), 'usuarios.xlsx');
    });
  }

  
  descargarExcelTurnos() 
  {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Turnos');
  
    worksheet.columns = [
      { header: 'Paciente', key: 'paciente'},
      { header: 'Medico', key: 'medico'},
      { header: 'Sector', key: 'sector'},
      { header: 'Tipo Atencion', key: 'tipo'},
      { header: 'Fecha', key: 'fecha'},
      { header: 'Horario', key: 'horario'},
    ];
  
    this.turnosUsuario.forEach((turno) => {
      const fechaFormateada = this.fechaFormato.formatearFecha(turno.fecha);
  
      worksheet.addRow({
        paciente: turno.pacienteApellido + " " + turno.pacienteNombre,
        medico: turno.especialistaApellido + " " + turno.especialistaNombre,
        sector: turno.sectorAtencion,
        tipo: turno.tipoAtencion,
        fecha: fechaFormateada,
        horario: turno.horario.hora + ":" + turno.horario.minutos,
      });
    });
  
    workbook.xlsx.writeBuffer().then((buffer) => {
      fs.saveAs(new Blob([buffer]), `turnos${this.usuarioSeleccionado.apellido}.xlsx`);
    });
  }
  
    
 

}
