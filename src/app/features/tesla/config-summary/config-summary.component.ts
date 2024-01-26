import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';
import { ConfiguredTesla } from '../services/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-summary.component.html',
  styleUrl: './config-summary.component.scss'
})
export class ConfigSummaryComponent implements OnInit {

  public configuredTesla$: Observable<ConfiguredTesla> | null = null;

  constructor(
    private configuredTeslaService: ConfiguredTeslaService) {
  }

  ngOnInit() {
    this.configuredTesla$ = this.configuredTeslaService.configuration$;
  }
}
