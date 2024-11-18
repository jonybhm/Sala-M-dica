import { Component,OnInit,Input, OnChanges, SimpleChanges} from '@angular/core';
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

    if(this.usuario)
    {
      console.log("USUARIO PARA H.C.:",this.usuario);
      this.obtenerAtencionesAnteriores();  
    }
    else
    {
      console.log("NO SE SELECCIONO USUARIO");
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

  
}
