import { Component, Input } from '@angular/core';
import { ConfiguredTesla } from '../../features/tesla/services/models';
import { ImageService } from './image.service';
import { ConfiguredTeslaService } from '../../features/tesla/services/configured-tesla.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tesla-image-viewer',
  standalone: true,
  imports: [],
  templateUrl: './tesla-image-viewer.component.html',
  styleUrl: './tesla-image-viewer.component.scss'
})
export class TeslaImageViewerComponent {

  private configuredTesla: ConfiguredTesla | null = null;
  private subSink: Subscription = new Subscription();
  constructor(
    private configuredTeslaService: ConfiguredTeslaService,
    private imageService: ImageService) {
  }

  ngOnInit() {
    const configuredTesla$ = this.configuredTeslaService.configuration$;

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
    });

    this.subSink.add(subscription);
  }

  initializeImageUrl(): string {
    if (this.configuredTesla && this.configuredTesla.modelCode && this.configuredTesla.modelColor?.code) {
      return this.imageService.getTeslaModelImage(this.configuredTesla.modelCode, this.configuredTesla.modelColor?.code)
    }
    return '';
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
