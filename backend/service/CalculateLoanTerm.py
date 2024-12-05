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