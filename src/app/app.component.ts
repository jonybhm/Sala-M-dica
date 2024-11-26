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
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,
    MatToolbarModule,MatButtonModule,MatCardModule,  MatSidenavModule,MatMenuModule,MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[slideInAnimation]
})
export class AppComponent {
  title = 'Sala Médica';
  loading = false;
  constructor(
    public auth: Auth, 
    public logout:LogoutService,
    private contexts: ChildrenOutletContexts,
    private router: Router
  )
  {
   
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true; 
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
