import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigationcomponent';
import { TeslaImageViewerComponent } from './shared/tesla-image-viewer/tesla-image-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    TeslaImageViewerComponent
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Angular';
}
