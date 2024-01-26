import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

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
