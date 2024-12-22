from flask import Flask, request, jsonify
from flask_cors import CORS
from service.CalculateLoanTerm import calculate_loan_term

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes and origins

@app.route('/calculate-loan', methods=['POST'])
def calculate_loan():
    data = request.json
    result, total_money_saved, total_interest_paid, total_principal_paid, loan_tenure_years = calculate_loan_term(
        data['principal'],
        data['rate'],
        data['time'],
        data['extra_emi_percent'],
        data['lump_sums'],
        data['pay_extra_emi']
    )
    
    structured_data = []
    for index, row in enumerate(result):
        structured_data.append({
            "year": index + 1,
            "normal_emi": float(row[0].replace(",", "")),
            "extra_emi": float(row[1].replace(",", "")),
            "yearly_payment": float(row[2].replace(",", "")),
            "repayment_years": row[3] if len(row) > 3 else None,
            "repayment_months": row[4] if len(row) > 4 else None
        })
    
    return jsonify({
        "loan_data": structured_data,
        "total_money_saved": round(total_money_saved, 2),
        "total_interest_paid": round(total_interest_paid, 2),
        "total_principal_paid": round(total_principal_paid, 2),
        "original_tenure": loan_tenure_years
    })
if __name__ == "__main__":
    app.run(debug=True)