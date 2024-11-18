import { Component,OnInit,Input } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';
import { collection, Firestore,  where,query,collectionData} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lista-atenciones-anteriores',
  templateUrl: './lista-atenciones-anteriores.component.html',
  styleUrl: './lista-atenciones-anteriores.component.scss'
})
export class ListaAtencionesAnterioresComponent implements OnInit{
  @Input() usuario: any;
  isLoading = true;

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
    const consulta = query(coleccion, where('usuarioMail', '==', this.usuario.email));
  
    collectionData(consulta).subscribe((historias) => {
      this.atencionesAnteriores = historias;
      this.isLoading = false;

    });
  }

  
}
