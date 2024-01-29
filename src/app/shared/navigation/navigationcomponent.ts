import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfiguredTeslaService } from '../../features/services/configured-tesla.service';
import { Subscription } from 'rxjs';
import { ConfiguredTesla } from '../../features/services/configured-tesla-model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {

  routerLinks: string[] = [];

  isModelConfigSelected = false;
  isModelOptionConfigSelected = false;

  private subSink: Subscription = new Subscription();

  constructor(private configuredTeslaService: ConfiguredTeslaService) {
  }

  ngOnInit() {
    this.initializeConfigSelection();
  }

  private initializeRouterLinks(modelCode: string | null): void {
    const step1Url = '/config/model';
    const step3Url = '/config/summary';

    let step2Url = '/config/option/:modelCode';

    if (modelCode)
      step2Url = step2Url.replace(':modelCode', modelCode);

    this.routerLinks.push(step1Url, step2Url, step3Url);
  }

  private initializeConfigSelection(): void {
    const configuredTesla$ = this.configuredTeslaService.getConfiguredTesla();

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla: ConfiguredTesla) => {
      self.initializeConfigSelectionInternal(configuredTesla);
      self.initializeRouterLinks(configuredTesla.modelCode)
    });

    this.subSink.add(subscription);
  }

  private initializeConfigSelectionInternal(configuredTesla: ConfiguredTesla): void {
    this.isModelConfigSelected = configuredTesla.getIsModelConfigSelected();
    this.isModelOptionConfigSelected = configuredTesla.getIsModelOptionConfigSelected();
  }

  ngOnDestroy(): void {
    if (this.subSink.closed) {
      return;
    }

    this.subSink.unsubscribe();
  }
}
