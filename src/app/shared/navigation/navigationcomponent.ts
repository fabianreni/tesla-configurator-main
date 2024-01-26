import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfiguredTeslaService } from '../../features/tesla/services/configured-tesla.service';
import { ConfiguredTesla } from '../../features/tesla/services/models';
import { ImageService } from '../tesla-image-viewer/image.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {
  private configuredTesla: ConfiguredTesla | null = null;
  private subSink: Subscription = new Subscription();

  constructor(
    private configuredTeslaService: ConfiguredTeslaService,
    private imageService: ImageService,
    private router: Router) {
  }

  ngOnInit() {
    const configuredTesla$ = this.configuredTeslaService.configuration$;

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla) => {
      self.configuredTesla = configuredTesla;
    });

    this.subSink.add(subscription);
  }

  public openTeslaModelConfig(): void {
    this.router.navigate(['/config/model']);
  }

  public openModelOptionsConfig(): void {
    let url = '/config/options/:modelCode';

    if (this.configuredTesla === null || this.configuredTesla.modelCode === null) {
      return;
    }

    url = url.replace(':modelCode', this.configuredTesla.modelCode)

    this.router.navigate([url]);
  }

  public openConfigSummaryConfig(): void {
    this.router.navigate(['/config/summary']);
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
