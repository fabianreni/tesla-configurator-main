import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeslaConfigComponent } from './features/tesla/tesla-config/tesla-config.component';
import { TeslaImageViewerComponent } from './shared/tesla-image-viewer/tesla-image-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TeslaConfigComponent,
    TeslaImageViewerComponent
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Angular';
}
