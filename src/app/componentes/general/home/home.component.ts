import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoService } from '../../../servicios/git-hub-info.service';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from '../../../servicios/logout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  sub!: Subscription;
  informacion:any;
  imgUrl:string='';
  usuarioGitHub:string='';
  repos:string='';
  
  constructor(
    private info: InfoService,
    public auth: Auth, 
    public logout:LogoutService,


  )
  {}
  ngOnInit(): void {
    this.sub = this.info.obtnerInfo().subscribe(infoPersonal => {
      this.informacion = infoPersonal;
      this.imgUrl = this.informacion.avatar_url;
      this.usuarioGitHub = this.informacion.login;
      this.repos = this.informacion.repos_url;

    });
  }
}
