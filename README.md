# LoanRepaymentCalculator

Overview

This project is a Python-based loan repayment calculator designed to estimate and analyze loan repayment schedules. The tool calculates how early you can repay a loan by adjusting various factors like extra EMI payments, lump-sum payments, and interest rates.

The output of the calculation is saved as a CSV file that includes detailed yearly payment information, total payments made, and money saved compared to the original loan schedule.

Features

	1.	Principal Amount Input:
	•	The initial loan amount to be repaid.
	2.	Annual Interest Rate:
	•	The annual interest rate for the loan (in percentage).
	3.	Loan Tenure:
	•	The duration of the loan in years.
	4.	EMI Calculation:
	•	The Equated Monthly Installment (EMI) is calculated using a standard formula, accounting for the interest rate and loan tenure.
	5.	Extra EMI Payment:
	•	The option to make one additional EMI each year (pay_extra_emi=True) is included, reducing the loan’s principal amount faster.
	6.	Incremental EMI:
	•	Allows for an annual increase in EMI by a specified percentage (extra_emi_percent), enabling faster principal repayment over time.
	7.	Lump-Sum Payments:
	•	You can specify lump-sum payments for specific years (lump_sums) to significantly reduce the principal balance.
	8.	Savings Calculation:
	•	Calculates the total money saved by repaying the loan early compared to the standard repayment schedule.
	9.	Detailed CSV Output:
	•	The program outputs a detailed CSV file (loan_repayment_data.csv) containing:
	•	Normal EMI
	•	Increased EMI
	•	Yearly payment
	•	Loan tenure in years and months
	•	Total money saved
	•	Total amount submitted
	•	Total interest paid

Input Parameters

	•	Principal Amount:
	•	The loan amount in currency (e.g., 5,500,000).
	•	Annual Interest Rate:
	•	The annual interest rate as a percentage (e.g., 8.5%).
	•	Loan Tenure:
	•	The duration of the loan in years (e.g., 25 years).
	•	Extra EMI Percentage:
	•	The annual percentage increase in EMI (e.g., 5%).
	•	Lump-Sum Payments:
	•	A list of tuples specifying the year and lump-sum amount (e.g., [(3, 3000000)]).
	•	Pay Extra EMI:
	•	A boolean flag to add an additional EMI payment annually (e.g., pay_extra_emi=True).

Factors Affecting Loan Repayment Speed

	1.	Annual Interest Rate:
	•	Higher interest rates increase the cost of borrowing, while lower rates allow faster repayment.
	2.	Extra EMI Payments:
	•	Paying an extra EMI annually reduces the outstanding principal and overall interest.
	3.	Incremental EMI Percentage:
	•	Increasing the EMI each year by a set percentage accelerates repayment and reduces the tenure.
	4.	Lump-Sum Payments:
	•	Applying lump sums directly reduces the principal amount, significantly shortening the repayment period.
	5.	Original Loan Tenure:
	•	Longer tenures result in lower monthly EMIs but higher overall interest. Reducing the tenure helps save on interest.
	6.	Principal Amount:
	•	Larger loan amounts naturally take longer to repay unless accompanied by higher payments.

How to Run the Program

	1.	Set Input Parameters:
	•	Adjust the values for principal, interest rate, tenure, etc., in the main() function.
	2.	Run the Script:
	•	Execute the script using Python. The loan repayment data will be calculated and saved to a CSV file.
	3.	View the Output:
	•	Open the generated CSV file (loan_repayment_data.csv) for detailed loan repayment information.

Example Output (CSV)

Normal EMI	Extra EMI (%)	Yearly Payment	Total Period (Years)	(Months)
47,975.00	47,975.00	575,700.00	25	0
47,975.00	50,373.75	604,485.00	12	6

Summary:
	•	Total Money Saved: X,XXX,XXX
	•	Total Amount Submitted: X,XXX,XXX
	•	Total Interest Paid: X,XXX,XXX

File Structure

	•	loan_repayment_data.csv: Output file containing loan repayment details.
	•	README.md: Documentation explaining the program.

Prerequisites

	•	Python 3.x
	•	Libraries:[Uploading CalculateLoanTerm.py…]()import csv
import locale
import math


def format_number(number):
    locale.setlocale(locale.LC_NUMERIC, '')
    formatted_number = locale.format_string("%.2f", number, grouping=True)
    return formatted_number

def calculate_loan_term(principal, annual_interest_rate, loan_tenure_years, extra_emi_percent, lump_sums, pay_extra_emi):
    r = annual_interest_rate / 12 / 100  # monthly interest rate
    n = loan_tenure_years * 12  # total number of payments

    # Calculate initial EMI using the formula
    emi = math.ceil((principal * r * (1 + r) ** n) / ((1 + r) ** n - 1))

    total_payment = 0
    total_months = 0
    data = []  # List to store loan repayment data

    # Make first year's payments with the same EMI
    for _ in range(12):
        total_payment += emi
        interest_payment = principal * r
        principal_payment = emi - interest_payment
        principal -= principal_payment
        total_months += 1

    year_payment = total_payment

    if(pay_extra_emi):
        principal -= emi
        year_payment += emi

    data.append([format_number(round(emi, 2)),
                 format_number(round(emi, 2)),
                 format_number(round(year_payment, 2))])

    # Increase EMI by given percentage each year from the second year onwards
    emi_with_extra = emi

    for year in range(2, loan_tenure_years + 1):
        # Apply lump sum payments for the current year if any exist
        extra_payment = 0
        for lump_sum in lump_sums:
            if lump_sum[0] == year:
                extra_payment = lump_sum[1]
                principal -= extra_payment

        # Increase EMI by extra_emi_percent from the previous year
        emi_with_extra *= 1 + extra_emi_percent / 100

        year_payment = (emi_with_extra * 12) + extra_payment
        
        if(pay_extra_emi):
            principal -= emi_with_extra
            year_payment += emi_with_extra

        current_month = 0
        
        for _ in range(12):
            total_payment += emi_with_extra
            interest_payment = principal * r
            principal_payment = emi_with_extra - interest_payment
            principal -= principal_payment
            total_months += 1
            current_month += 1

            if principal <= 0:
                year_payment = emi_with_extra * current_month
                years = total_months // 12
                months = total_months % 12

                data.append([format_number(round(emi, 2)),
                             format_number(round(emi_with_extra, 2)),
                             format_number(round(year_payment, 2)),
                             years,
                             months])
                
                total_money_saved = (emi * n) - total_payment  # Calculate total money saved
                return data, max(total_money_saved, 0)

        data.append([format_number(round(emi, 2)),
                     format_number(round(emi_with_extra, 2)),
                     format_number(round(year_payment, 2))])

    total_money_saved = (emi * n) - total_payment  # Calculate total money saved
    return data, max(total_money_saved, 0)


def write_loan_data_to_csv(file_name, principal, loan_data, loan_tenure_years, extra_emi_percent, total_money_saved):
    with open(file_name, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(['Principal Amount', f'{format_number(principal)} '])
        csvwriter.writerow([])
        csvwriter.writerow(['Original Tenure', f'{loan_tenure_years} years'])
        csvwriter.writerow([])
        csvwriter.writerow([])
        csvwriter.writerow(
            ['Normal EMI', f'Extra EMI({extra_emi_percent}%)', 'Yearly Payment', 'Total Period (Years)', '(Months)'])
        csvwriter.writerows(loan_data)

        # Write the total money saved
        csvwriter.writerow([])
        csvwriter.writerow(['Total Money Saved:', format_number(round(total_money_saved, 2))])
        # Write the total amount submitted towards the loan
        total_payment = sum(float(row[2].replace(',', '')) for row in loan_data)
        csvwriter.writerow(['Total Amount Submitted:', format_number(round(total_payment, 2))])
        # Write the total interest paid
        total_interest = total_payment - principal
        csvwriter.writerow(['Total Interest Paid:', format_number(round(total_interest, 2))])


def main():
    principal = 5500000  # Principal amount
    annual_interest_rate = 8.5  # Annual interest rate
    loan_tenure_years = 25  # Loan tenure in years
    extra_emi_percent = 5  # Extra EMI percentage
    lump_sums = [(3,3000000)] # Multiple lump sums (year, amount)
    pay_extra_emi = True # 13 EMIs instead of 12

    # Calculate loan repayment data
    loan_data, total_money_saved = calculate_loan_term(principal, annual_interest_rate, loan_tenure_years,
                                                       extra_emi_percent, lump_sums, pay_extra_emi)

    # Write loan data to CSV file
    file_name = 'loan_repayment_data.csv'
    write_loan_data_to_csv(file_name, principal, loan_data, loan_tenure_years, extra_emi_percent, total_money_saved)

    print(f"Loan repayment data has been saved to '{file_name}'")


if __name__ == "__main__":
    main()

	•	csv
	•	locale
	•	math

Future Enhancements

	1.	Graphical Visualization:
	•	Add visual graphs for payment trends and interest savings.
	2.	Custom Payment Plans:
	•	Support for irregular lump-sum payments or EMI schedules.
	3.	Interactive CLI:
	•	Allow users to input values interactively.

License

This program is free to use and distribute.
