import { Component,OnInit,Input } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { addDoc,collection, Firestore, updateDoc, where,query,orderBy,collectionData} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lista-atenciones-anteriores',
  templateUrl: './lista-atenciones-anteriores.component.html',
  styleUrl: './lista-atenciones-anteriores.component.scss'
})
export class ListaAtencionesAnterioresComponent implements OnInit{
  @Input() usuario: any;
  sub!: Subscription;
  atencionesAnteriores: any[] = [];

  constructor(
    public auth:Auth,
    public logout:LogoutService,
    private firestore:Firestore, 
  )
  {}

  ngOnInit(): void {

    this.obtenerAtencionesAnteriores();
  }

  obtenerAtencionesAnteriores() 
  {
    const coleccion = collection(this.firestore, 'historiasClinicas');
    const consulta = query(coleccion, where('usuario', '==', this.usuario.id), orderBy('fecha', 'desc'));
  
    collectionData(consulta).subscribe((historias) => {
      this.atencionesAnteriores = historias;
    });
  }

}
