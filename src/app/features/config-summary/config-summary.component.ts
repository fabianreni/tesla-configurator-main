import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguredTeslaService } from '../services/configured-tesla.service';
import { CommonModule } from '@angular/common';
import { ConfiguredTesla } from '../services/configured-tesla-model';

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
    this.configuredTesla$ = this.configuredTeslaService.getConfiguredTesla();
  }
}
