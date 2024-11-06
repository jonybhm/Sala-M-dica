import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from './servicios/logout.service';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,
    MatToolbarModule,MatButtonModule,MatCardModule, MatProgressBar, MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'primer-parcial-DeCastroJonathan';
  isLoading = true;
  constructor(
    public auth: Auth, 
    public logout:LogoutService,
  )
  {
    setTimeout(()=>{
      this.isLoading = false;
    }, 3000)
  }
}
