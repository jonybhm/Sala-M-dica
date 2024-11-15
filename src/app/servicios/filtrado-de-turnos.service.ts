import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltradoDeTurnosService {

  constructor() { }

  filtrarTurnosPaciente(turnos:any[], filtroEspecialidad:string, filtroEspecialista:string)
  {
    turnos = turnos.filter(turno => {
      const coincideEspecialidad = turno.sectorAtencion.toLowerCase().includes(filtroEspecialidad.toLowerCase());
      const coincideEspecialista = `${turno.especialistaNombre} ${turno.especialistaApellido}`.toLowerCase().includes(filtroEspecialista.toLowerCase());
      return coincideEspecialidad && coincideEspecialista;
    });
  }

  filtrarTurnosEspecialista(turnos:any[], filtroEspecialidad:string, filtroPaciente:string)
  {
    turnos=turnos.filter(turno => {
      const coincideEspecialidad = turno.sectorAtencion.toLowerCase().includes(filtroEspecialidad.toLowerCase());
      const coincidePaciente = `${turno.pacienteNombre} ${turno.pacienteApellido}`.toLowerCase().includes(filtroPaciente.toLowerCase());
      return coincideEspecialidad && coincidePaciente;
    });
  }

}
