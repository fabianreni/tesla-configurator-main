import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tesla-config',
  standalone: true,
  imports: [],
  templateUrl: './tesla-config.component.html',
  styleUrl: './tesla-config.component.scss'
})
export class TeslaConfigComponent {

  constructor(private router: Router) {
  }

  public openTeslaModelConfig(): void {
    this.router.navigate(['/config/model']);
  }

  public openModelOptionsConfig(): void {
    this.router.navigate(['/config/options']);
  }

  public openConfigSummaryConfig(): void {
    this.router.navigate(['/config/summary']);
  }
}
