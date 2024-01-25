import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe, JsonPipe,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Angular';
}
