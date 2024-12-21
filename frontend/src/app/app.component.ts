import { Component } from '@angular/core';
import { LoanFormComponent } from './loan-form/loan-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ LoanFormComponent]
})
export class AppComponent {
}
