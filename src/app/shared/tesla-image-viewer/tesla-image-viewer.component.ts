import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ImageService } from './image.service';
import { ConfiguredTeslaService } from '../../features/services/configured-tesla.service';
import { Subscription } from 'rxjs';
import { ConfiguredTesla } from '../../features/services/configured-tesla-model';

@Component({
  selector: 'app-tesla-image-viewer',
  standalone: true,
  imports: [],
  templateUrl: './tesla-image-viewer.component.html',
  styleUrl: './tesla-image-viewer.component.scss'
})
export class TeslaImageViewerComponent implements OnInit, OnDestroy {
  imageUrl = signal('')

  private subSink: Subscription = new Subscription();
  constructor(
    private configuredTeslaService: ConfiguredTeslaService,
    private imageService: ImageService) {
  }

  ngOnInit() {
    const configuredTesla$ = this.configuredTeslaService.configuration$;

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.setImageUrl(configuredTesla);
    });

    this.subSink.add(subscription);
  }

  private setImageUrl(configuredTesla: ConfiguredTesla): void {
    if (configuredTesla.modelCode && configuredTesla.modelColor?.code) {
      const url = this.imageService.getTeslaModelImage(
        configuredTesla.modelCode, configuredTesla.modelColor?.code);
      this.imageUrl.set(url);
    }
    else {
      this.imageUrl.set('');
    }
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
