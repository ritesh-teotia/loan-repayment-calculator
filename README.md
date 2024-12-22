# Loan Repayment Calculator

## Overview

The Loan Repayment Calculator is a web-based tool designed to estimate and analyze loan repayment schedules. It calculates how early you can repay a loan by adjusting various factors like extra EMI payments, lump-sum payments, and interest rates.

The results, including detailed yearly payment information, total payments made, and money saved compared to the original loan schedule, are displayed directly on the UI instead of being saved as a CSV file.

### Features

1\. Principal Amount Input
- Enter the initial loan amount to be repaid.

2\. Annual Interest Rate
- Set the annual interest rate for the loan (in percentage).

3\. Loan Tenure
- Specify the duration of the loan in years.

4\. EMI Calculation
- Calculate the Equated Monthly Installment (EMI) using a standard formula, accounting for the interest rate and loan tenure.

5\. Extra EMI Payment
- Option to make one additional EMI each year (pay\_extra\_emi = true) to reduce the loan's principal amount faster.

6\. Incremental EMI
- Allows an annual increase in EMI by a specified percentage (extra\_emi\_percent), enabling faster principal repayment over time.

7\. Lump-Sum Payments
- Specify lump-sum payments for specific years to significantly reduce the principal balance.

8\. Savings Calculation
- Calculates the total money saved by repaying the loan early compared to the standard repayment schedule.

9\. Dynamic UI Output

- Results are displayed directly on the UI, including:
	- Normal EMI
 	- Increased EMI
	- Yearly Payments
 	- Loan Tenure in years and months
 	- Total Money Saved
 	- Total Amount Submitted
 	- Total Interest Paid

### Input Parameters

\- Principal Amount: Loan amount in currency (e.g., 5,500,000).

\- Annual Interest Rate: Annual interest rate as a percentage (e.g., 8.5%).

\- Loan Tenure: Duration of the loan in years (e.g., 25 years).

\- Extra EMI Percentage: Annual percentage increase in EMI (e.g., 5%).

\- Lump-Sum Payments: A list of objects specifying the year and lump-sum amount (e.g., { year: 3, amount: 3000000 }).

\- Pay Extra EMI: A boolean flag to add an additional EMI payment annually (pay\_extra\_emi = true).

### Factors Affecting Loan Repayment Speed

1\. Annual Interest Rate:

- Higher interest rates increase the cost of borrowing, while lower rates allow faster repayment.

2\. Extra EMI Payments:

- Paying an extra EMI annually reduces the outstanding principal and overall interest.

3\. Incremental EMI Percentage:

- Increasing the EMI each year by a set percentage accelerates repayment and reduces the tenure.

4\. Lump-Sum Payments:

- Applying lump sums directly reduces the principal amount, significantly shortening the repayment period.

5\. Original Loan Tenure:

- Longer tenures result in lower monthly EMIs but higher overall interest. Reducing the tenure helps save on interest.

6\. Principal Amount:

- Larger loan amounts naturally take longer to repay unless accompanied by higher payments.

### How to Use

1\. Set Input Parameters

- Enter values for principal, interest rate, tenure, etc., using the form on the UI.

2\. Submit the Form

- Click on the "Calculate" button to analyze the repayment schedule.

3\. View Results

- Results are displayed directly on the UI with graphical representations for easy analysis:

- Bar Chart comparing total payments and savings.

- Pie Chart showing the proportion of principal vs. interest.

- Line Chart visualizing yearly EMI payments over time.

### Example Output on UI

Loan Summary

\- Original Tenure: 25 years

\- Optimized Tenure: 20 years 6 months

Charts

1\. Comparison: Normal vs. Optimized Payments

- Bar chart displaying total payments, optimized payments, and savings.

2\. Proportion of Principal vs. Interest

- Pie chart showing the distribution between principal and interest payments.

3\. Yearly EMI Payments Over Time

- Line chart depicting the EMI payment trends for normal and optimized payments.

### Future Enhancements

1\. Custom Payment Plans

- Support for irregular lump-sum payments or EMI schedules.

2\. Enhanced Visualization

- Add more visual tools to analyze loan repayment.

3\. Interactive Analysis

- Include sliders and real-time chart updates for user-friendly interaction.

### Prerequisites

***Frontend***

\- Angular Framework

\- ng2-charts Library for graphical visualizations

***Backend***

\- Python Flask API for loan repayment calculations


### How to run locally
1. Open terminal 
2. Navigate to frontend directory ```cd frontend```
3. Run command to start both frontend and backend ```npm start```

### License

@Ritesh Teotia

**Free Software, Hell Yeah!**