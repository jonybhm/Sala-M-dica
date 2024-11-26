import { Component,OnInit,Input, OnChanges, SimpleChanges,Output,EventEmitter} from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { collection, Firestore,  where,query,collectionData} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { jsPDF } from 'jspdf';
import { FormatearFechaService } from '../../../servicios/formatear-fecha.service';

@Component({
  selector: 'app-lista-atenciones-anteriores',
  templateUrl: './lista-atenciones-anteriores.component.html',
  styleUrl: './lista-atenciones-anteriores.component.scss'
})
export class ListaAtencionesAnterioresComponent implements OnInit{
  @Input() usuario: any;
  @Input() paciente: any;
  @Input() turno: any;
  @Output() historiasPrevias = new EventEmitter<any>();

  isLoading = true;

  sub!: Subscription;
  atencionesAnteriores: any[] = [];

  constructor(
    public auth:Auth,
    public logout:LogoutService,
    private firestore:Firestore, 
    public fechaFormato:FormatearFechaService

  )
  {}

  ngOnInit(): void {

    if(this.usuario)
    {
      this.obtenerAtencionesAnteriores();  
    }
    else
    {
      console.log("NO SE SELECCIONO USUARIO");
    }

    if(this.paciente)
      {
        this.obtenerAtencionesAnterioresEspecialista(this.auth.currentUser?.email ?? "");  
      }
      else
      {
        console.log("NO SE SELECCIONO paciente");
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && changes['usuario'].currentValue) 
    {
      this.isLoading = true; 
      this.obtenerAtencionesAnteriores();
    }
  }

  obtenerAtencionesAnteriores() 
  {
    if (!this.usuario || !this.usuario.email)
    {
      this.isLoading = false;
      return;
    }
    const coleccion = collection(this.firestore, 'historiasClinicas');
    const consulta = query(coleccion, where('usuarioMail', '==', this.usuario.email));
  
    collectionData(consulta).subscribe((historias) => {
      this.atencionesAnteriores = historias;
      this.isLoading = false;

    });
  }

  obtenerAtencionesAnterioresEspecialista(especialistaMail:string) 
  {
    if (!this.paciente || !this.paciente.email)
    {
      this.isLoading = false;
      return;
    }
    const especialistaMailActual = especialistaMail;

    if (!especialistaMailActual) 
    {
      console.warn("No se pudo obtener el email del especialista actual");
      this.isLoading = false;
      return;
    }

    const coleccion = collection(this.firestore, 'historiasClinicas');
    const consulta = query(coleccion, where('usuarioMail', '==', this.paciente.email),where('especialistaMail', '==', especialistaMailActual));
  
    collectionData(consulta).subscribe((historias) => {
      this.atencionesAnteriores = historias;
      this.isLoading = false;

      console.log()
    
      this.historiasPrevias.emit(historias);
    });
  }

  descargarHistoriaClinicaPorEspecialista(profesionalEmail: string) 
  {
    this.obtenerAtencionesAnterioresEspecialista(profesionalEmail);
  
    const doc = new jsPDF();
  
    const logoUrl = '/caja-medica.png';
    const img = new Image();
    img.src = logoUrl;
  
    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 30, 30);
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(`Informe Médico-${this.usuario.apellido} ${this.usuario.nombre}`, 105, 20, { align: 'center' });
  
      const fechaEmision = new Date().toLocaleDateString();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Fecha de emisión: ${fechaEmision}`, 105, 30, { align: 'center' });
  
      
      let y = 60;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      this.atencionesAnteriores.forEach((atencion, index) => {

        doc.setFont('helvetica', 'bold');
        doc.text(`Atención ${this.fechaFormato.formatearFecha(atencion.fecha)}:`, 20, y);
        y += 10;
  
        doc.setFont('helvetica', 'normal');
        doc.text(`Altura: ${atencion.altura} cm - Peso: ${atencion.peso} kg`, 20, y);
        y += 7;
        doc.text(`Temperatura: ${atencion.temperatura} °C - Presión: ${atencion.presion}`, 20, y);
        y += 7;
  
        atencion.datosDinamicos.forEach(datoDinamico => {
          doc.text(`${datoDinamico.clave}: ${datoDinamico.valor}`, 20, y);
          y += 7; 
        });
  
        y += 10;
      });
  
      doc.save(`informe_medico_${this.usuario.apellido}_${this.usuario.nombre}.pdf`);
    };
  
    img.onerror = (error) => {
      console.error('Error al cargar la imagen:', error);
      alert('No se pudo cargar la imagen. Verifica que el archivo exista en la carpeta public.');
    };
  }
  
}
