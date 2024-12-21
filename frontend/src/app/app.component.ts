import { Component } from '@angular/core';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ LoanFormComponent, LoanDetailComponent]
})
export class AppComponent {
}
