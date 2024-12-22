import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

@Component({
  selector: 'app-loan-chart',
  imports: [BaseChartDirective],
  templateUrl: './loan-chart.component.html',
  styleUrl: './loan-chart.component.scss'
})
export class LoanChartComponent implements OnInit {
  @Input() loanData: any;
  @Input() normalEMI!: number;
  @Input() totalMoneySaved!: number;
  @Input() totalInterestPaid!: number;
  @Input() principalAmount!: number;
  @Input() originalTenure!: number;
  @Input() repaymentYears!: number;
  @Input() repaymentMonths!: number;

  barChartData!: ChartData<'bar'>;
  pieChartData!: ChartData<'pie'>;
  lineChartData!: ChartData<'line'>;

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Amounts Paid and Savings'
      }
    }
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Principal vs Interest Paid'
      }
    }
  };

  lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly EMI Payments'
      }
    }
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeCharts();
  }

  ngOnChanges(): void {
    this.initializeCharts();
    this.cdr.detectChanges();
  }

  initializeCharts(): void {

    this.lineChartData = { labels: [], datasets: [] };
    this.barChartData = { labels: [], datasets: [] };
    this.pieChartData = { labels: [], datasets: [] };

    // Pie Chart: Proportion of Principal vs Interest
    this.pieChartData = {
      labels: ['Principal Amount', 'Interest Paid'],
      datasets: [
        {
          data: [this.principalAmount, this.totalInterestPaid],
          backgroundColor: ['#36A2EB', '#FF6384'], // New colors for pie chart
          hoverBackgroundColor: ['#5CC3F2', '#FF8FA3'], // Slightly lighter hover colors
        }
      ]
    };
  
  const totalNormalEmiPaid = this.normalEMI * 12 * this.originalTenure;
  const totalPaid = this.principalAmount + this.totalInterestPaid;
  
    // Bar Chart: Savings and Total Amount
    this.barChartData = {
      labels: ['Total Amount Paid (Normal EMI)', 'Optimized EMI Payments', 'Savings'],
      datasets: [
        {
          label: 'Amount (₹)',
          data: [totalNormalEmiPaid, totalPaid, this.totalMoneySaved],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFCA28'], // Blue, green, yellow
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFE082'], // Lighter hover colors
        }
      ]
    };

    // Line Chart: Yearly Payments Over Time
    const years = this.loanData.map((entry: any) => entry.year);
    const optimizedEMI = this.loanData.map((entry: any) => entry.extra_emi);

    this.lineChartData = {
      labels: years,
      datasets: [
        {
          label: 'Normal EMI',
          data: Array(years.length).fill(this.normalEMI),
          borderColor: '#E57373', // Light red for the line
          backgroundColor: 'rgba(229, 115, 115, 0.3)', // Transparent fill
          pointBackgroundColor: '#D32F2F', // Red for points
          fill: true
        },
        {
          label: 'Optimized EMI',
          data: optimizedEMI,
          borderColor: '#4CAF50', // Green for the line
          backgroundColor: 'rgba(76, 175, 80, 0.3)', // Transparent green fill
          pointBackgroundColor: '#388E3C', // Dark green for points
          fill: true
        }
      ]
    };
  }
}