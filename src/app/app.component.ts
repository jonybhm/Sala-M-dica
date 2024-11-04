import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from './servicios/logout.service';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,
    MatToolbarModule,MatButtonModule,MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'primer-parcial-DeCastroJonathan';
  constructor(
    public auth: Auth, 
    public logout:LogoutService,


  )
  {}
}
