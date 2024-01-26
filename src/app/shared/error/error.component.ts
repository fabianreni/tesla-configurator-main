import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  public errorTitle = '404 - Not Found';
  public errorDescription = 'Sorry, the requested page does not exist.';
}
