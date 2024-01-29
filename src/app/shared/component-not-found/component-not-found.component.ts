import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './component-not-found.component.html',
  styleUrl: './component-not-found.component.scss'
})
export class ComponentNotFoundComponent {
  public errorTitle = '404 - Not Found';
  public errorDescription = 'Sorry, the requested page does not exist.';
}
