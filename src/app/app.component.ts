import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeslaConfigComponent } from './features/tesla/tesla-config/tesla-config.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TeslaConfigComponent
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Angular';
}
