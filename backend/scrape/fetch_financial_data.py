# import yfinance as yf
# import pandas as pd
# import sys
# import json

# def fetch_forex_data(ticker, start, end):
#     data = yf.download(ticker, start=start, end=end)
#     return data.to_dict(orient='records')

# def fetch_cashflow_data(ticker):
#     try:
#         stock = yf.Ticker(ticker)
#         cashflow = stock.financials.transpose().to_dict(orient='records')
#         return cashflow
#     except Exception as e:
#         return {"error": str(e)}

# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print(json.dumps({"error": "Ticker symbol is required"}))
#         sys.exit(1)

#     ticker = sys.argv[1]
#     start_date = sys.argv[2] if len(sys.argv) > 2 else None
#     end_date = sys.argv[3] if len(sys.argv) > 3 else None

#     result = {}

#     # Fetch forex data if start and end dates are provided
#     if start_date and end_date:
#         try:
#             forex_data = fetch_forex_data(ticker, start_date, end_date)
#             result['forex_data'] = forex_data
#         except Exception as e:
#             result['forex_data'] = {"error": str(e)}

#     # Fetch cash flow data
#     try:
#         cashflow_data = fetch_cashflow_data(ticker)
#         result['cashflow_data'] = cashflow_data
#     except Exception as e:
#         result['cashflow_data'] = {"error": str(e)}

#     print(json.dumps(result, indent=4))







import yfinance as yf
import pandas as pd
import sys
import json

def fetch_forex_data(ticker, start, end):
    data = yf.download(ticker, start=start, end=end)
    data = data.fillna('null')  # Replace NaN with 'null' or any other placeholder
    return data.to_dict(orient='records')

def fetch_cashflow_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        cashflow = stock.cashflow.transpose().fillna('null').to_dict(orient='records')  # Replace NaN with 'null'
        return cashflow
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Ticker symbol is required"}))
        sys.exit(1)

    ticker = sys.argv[1]
    start_date = sys.argv[2] if len(sys.argv) > 2 else None
    end_date = sys.argv[3] if len(sys.argv) > 3 else None

    result = {}

    # Fetch forex data if start and end dates are provided
    if start_date and end_date:
        try:
            forex_data = fetch_forex_data(ticker, start_date, end_date)
            result['forex_data'] = forex_data
        except Exception as e:
            result['forex_data'] = {"error": str(e)}

    # Fetch cash flow data
    try:
        cashflow_data = fetch_cashflow_data(ticker)
        result['cashflow_data'] = cashflow_data
    except Exception as e:
        result['cashflow_data'] = {"error": str(e)}

    print(json.dumps(result, indent=4))
