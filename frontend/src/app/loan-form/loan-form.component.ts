import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface LumpSum {
  year: number | null;
  amount: number | null;
}

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})

export class LoanFormComponent {
  loanDetails = {
    principal: 500000,
    rate: 8.5,
    time: 20,
    extra_emi_percent: 5,
    lump_sums: [] as LumpSum[],
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

  addLumpSum(): void {
    this.loanDetails.lump_sums.push({ year: null, amount: null }); 
  }

  removeLumpSum(index: number): void {
    this.loanDetails.lump_sums.splice(index, 1);
  }

  onSubmit(): void {
    const transformedLumpSums = this.loanDetails.lump_sums
      .filter(ls => ls.year !== null && ls.amount !== null)
      .map(ls => [ls.year, ls.amount]);

    const loanDetailsToSubmit = {
      ...this.loanDetails,
      lump_sums: transformedLumpSums
    };

    console.log('Loan Details:', loanDetailsToSubmit);
  }
}