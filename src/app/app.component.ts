import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Auth} from '@angular/fire/auth'
import { LogoutService } from './servicios/logout.service';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,
    MatToolbarModule,MatButtonModule,MatCardModule, MatProgressBar, MatSidenavModule,MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[slideInAnimation]
})
export class AppComponent {
  title = 'Sala Médica';
  isLoading = true;
  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private contexts: ChildrenOutletContexts
  )
  {
    setTimeout(()=>{
      this.isLoading = false;
    }, 3000)
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
