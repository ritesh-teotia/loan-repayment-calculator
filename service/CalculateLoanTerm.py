import csv
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


# def main():
#     principal = 5500000  # Principal amount
#     annual_interest_rate = 8.5  # Annual interest rate
#     loan_tenure_years = 25  # Loan tenure in years
#     extra_emi_percent = 5  # Extra EMI percentage
#     lump_sums = [(3,3000000)] # Multiple lump sums (year, amount)
#     pay_extra_emi = True # 13 EMIs instead of 12

#     # Calculate loan repayment data
#     loan_data, total_money_saved = calculate_loan_term(principal, annual_interest_rate, loan_tenure_years,
#                                                        extra_emi_percent, lump_sums, pay_extra_emi)

#     # Write loan data to CSV file
#     file_name = 'loan_repayment_data.csv'
#     write_loan_data_to_csv(file_name, principal, loan_data, loan_tenure_years, extra_emi_percent, total_money_saved)

#     print(f"Loan repayment data has been saved to '{file_name}'")


# if __name__ == "__main__":
#     main()