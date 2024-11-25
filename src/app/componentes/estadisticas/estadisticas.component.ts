import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { addDoc,query,collection, Firestore, orderBy, collectionData,where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FormatearFechaService } from '../../servicios/formatear-fecha.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Timestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements OnInit {
  fechaInicio!: Date;
  fechaFinal!: Date;
  registroIngreso: any[] = [];
  turnos: any[] = [];

  graficoEspecialidad!: Chart | null;
  graficoDia!: Chart | null;
  graficoSolicitados!: Chart | null;
  graficoFinalizados!: Chart | null;

  constructor(
    private firestore: Firestore,
    public fechaFormato: FormatearFechaService,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.obtenerDatosIniciales();
  }

  obtenerDatosIniciales() 
  {
    this.obtenerRegistroIngresosDB();
    this.obtenerTurnosDB();
  }

  obtenerRegistroIngresosDB() 
  {
    const coleccion = collection(this.firestore, 'ingresosUsuarios');
    let consulta = query(coleccion, orderBy("fechaIngreso", "asc"));

    if (this.fechaInicio && this.fechaFinal) 
    {
      consulta = query(
        coleccion,
        where("fechaIngreso", ">=", this.fechaInicio),
        where("fechaIngreso", "<=", this.fechaFinal)
      );
    }

    const observable = collectionData(consulta);
    observable.subscribe((respuesta: any) => {
      this.registroIngreso = respuesta;
    });
  }

  obtenerTurnosDB() 
  {
    const coleccion = collection(this.firestore, 'turnosAsignados');
    let consulta = query(coleccion, orderBy("fecha", "asc"));

    if (this.fechaInicio && this.fechaFinal) {
      const inicio = Timestamp.fromDate(new Date(this.fechaInicio));
      const final = Timestamp.fromDate(new Date(this.fechaFinal));

      consulta = query(
        coleccion,
        where("fecha", ">=", inicio),
        where("fecha", "<=", final),
        orderBy("fecha", "asc")
      );
    }

    const observable = collectionData(consulta);
    observable.subscribe((respuesta: any) => {
      this.turnos = respuesta;
      this.calcularEstadisticas();
    });
  }


  filtrarPorFecha() 
  {
    this.obtenerRegistroIngresosDB();
    this.obtenerTurnosDB();
  }

  calcularEstadisticas()
  {
    const turnosPorEspecialidad: { [key: string]: number } = {};
    const turnosPorDia: { [key: string]: number } = {};
    const turnosPorMedico: { [key: string]: { solicitados: number, finalizados: number } } = {};

    for (const turno of this.turnos) {
      const especialidad = turno.sectorAtencion || 'Sin Especialidad';
      turnosPorEspecialidad[especialidad] = (turnosPorEspecialidad[especialidad] || 0) + 1;

      const dia = turno.fecha.toDate().toLocaleDateString();
      turnosPorDia[dia] = (turnosPorDia[dia] || 0) + 1;

      const medico = turno.especialistaApellido || 'Sin Médico';
      if (!turnosPorMedico[medico]) {
        turnosPorMedico[medico] = { solicitados: 0, finalizados: 0 };
      }
      turnosPorMedico[medico].solicitados += 1;
      if (turno.estado === 'Realizado') {
        turnosPorMedico[medico].finalizados += 1;
      }
    }

    this.generarGraficos(turnosPorEspecialidad, turnosPorDia, turnosPorMedico);
  }

  generarGraficos(especialidades: { [key: string]: number }, dias: { [key: string]: number }, medicos: any) 
  {
    if (this.graficoEspecialidad) this.graficoEspecialidad.destroy();
    if (this.graficoDia) this.graficoDia.destroy();
    if (this.graficoSolicitados) this.graficoSolicitados.destroy();
    if (this.graficoFinalizados) this.graficoFinalizados.destroy();

    const especialidadesLabels: string[] = Object.keys(especialidades);
    const especialidadesData: number[] = Object.values(especialidades);

    const diasLabels: string[] = Object.keys(dias);
    const diasData: number[] = Object.values(dias);

    const medicosLabels: string[] = Object.keys(medicos);
    const medicosSolicitados: number[] = medicosLabels.map(m => medicos[m].solicitados || 0);
    const medicosFinalizados: number[] = medicosLabels.map(m => medicos[m].finalizados || 0);

    this.graficoEspecialidad = new Chart<'bar', number[], string>('graficoEspecialidad', {
      type: 'bar',
      data: {
        labels: especialidadesLabels,
        datasets: [{ label: 'Turnos por Especialidad', data: especialidadesData }]
      }
    });

    this.graficoDia = new Chart<'line', number[], string>('graficoDia', {
      type: 'line',
      data: {
        labels: diasLabels,
        datasets: [{ label: 'Turnos por Día', data: diasData }]
      }
    });

    this.graficoSolicitados = new Chart<'bar', number[], string>('graficoSolicitados', {
      type: 'bar',
      data: {
        labels: medicosLabels,
        datasets: [{ label: 'Turnos Solicitados por Médico', data: medicosSolicitados }]
      }
    });

    this.graficoFinalizados = new Chart<'bar', number[], string>('graficoFinalizados', {
      type: 'bar',
      data: {
        labels: medicosLabels,
        datasets: [{ label: 'Turnos Finalizados por Médico', data: medicosFinalizados }]
      }
    });
  }

  
  descargarEstadisticas() {
    const doc = new jsPDF();
  
    const logoUrl = '/caja-medica.png';
    const img = new Image();
    img.src = logoUrl;
  
    img.onload = async () => {
      doc.addImage(img, 'PNG', 10, 10, 30, 30);
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(`Estadísticas`, 105, 20, { align: 'center' });
  
      const fechaEmision = new Date().toLocaleDateString();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Fecha de emisión: ${fechaEmision}`, 105, 30, { align: 'center' });
  
      let y = 50;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Registro de Ingresos al Sistema:', 10, y);
  
      y += 10;
      this.registroIngreso.forEach((registro, index) => {
        const fecha = registro.fechaIngreso.toDate().toLocaleString();
        const usuario = registro.usuario;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`${index + 1}. ${fecha} - Usuario: ${usuario}`, 10, y);
        y += 6;
  
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });
  
      const graficos = ['graficoEspecialidad', 'graficoDia', 'graficoSolicitados', 'graficoFinalizados'];
      for (const graficoId of graficos) 
      {
        const canvas = document.getElementById(graficoId) as HTMLCanvasElement;
  
        if (canvas) {
          const canvasImage = await html2canvas(canvas).then(canvas => canvas.toDataURL('image/png'));
          if (y + 100 > 280) {
            doc.addPage();
            y = 10;
          }
          doc.addImage(canvasImage, 'PNG', 10, y, 190, 100);
          y += 110;
        }
      }
  
      doc.save(`Estadisticas_${fechaEmision}.pdf`);
    };
  
    img.onerror = (error) => {
      console.error('Error al cargar la imagen:', error);
      alert('No se pudo cargar la imagen. Verifica que el archivo exista en la carpeta public.');
    };
  }
}

