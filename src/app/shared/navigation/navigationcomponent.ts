import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfiguredTeslaService } from '../../features/services/configured-tesla.service';
import { Subscription } from 'rxjs';
import { ConfiguredTesla } from '../../features/services/configured-tesla-model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  routerLinks: string[] = [];

  isModelConfigSelected = false;
  isModelTypeSelected = false;

  private subSink: Subscription = new Subscription();

  constructor(private configuredTeslaService: ConfiguredTeslaService) {
  }

  ngOnInit() {
    this.initializeConfiguredTesla();
    this.initializeRouterLinks();
  }

  public initializeConfiguredTesla(): void {
    const configuredTesla$ = this.configuredTeslaService.configuration$;

    const self = this;
    const subscription = configuredTesla$.subscribe((configuredTesla: ConfiguredTesla) => {
      self.isModelConfigSelected = configuredTesla.getIsModelConfigSelected();
      self.isModelTypeSelected = configuredTesla.getIsModelTypeSelected();
    });

    this.subSink.add(subscription);
  }

  private initializeRouterLinks(): void {
    const step1Url = "/config/model";
    const step3Url = "/config/summary";
    const step2Url = '/config/options/';

    this.routerLinks.push(step1Url, step2Url, step3Url);
  }
}
