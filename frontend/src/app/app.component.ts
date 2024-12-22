import { Component } from '@angular/core';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanChartComponent } from './loan-chart/loan-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ LoanFormComponent, LoanChartComponent, CommonModule]
})
export class AppComponent {

  chartData: any = null;

  onLoanFormSubmit(data: any): void {
    this.chartData = { ...data };
  }
}
