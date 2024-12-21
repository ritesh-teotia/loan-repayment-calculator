import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent {
  loanDetails = {
    principal: 500000,
    rate: 8.5,
    time: 20,
    extra_emi_percent: 5,
    lump_sums: '',
    pay_extra_emi: false
  };

  get formattedPrincipal(): string {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
      this.loanDetails.principal
    );
  }

  onPrincipalChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value.replace(/,/g, '');
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      this.loanDetails.principal = numericValue;
    }
  }

  onSubmit(): void {
    console.log('Loan Details:', this.loanDetails);
  }
}