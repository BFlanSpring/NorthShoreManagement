# import sys
# import json
# import yfinance as yf
# import pandas as pd

# def fetch_forex_data(ticker, start, end):
#     data = yf.download(ticker, start=start, end=end)
#     return data.to_dict(orient='records')

# if __name__ == "__main__":
#     if len(sys.argv) != 4:
#         print(json.dumps({"error": "Ticker, start, and end dates are required"}))
#         sys.exit(1)

#     ticker = sys.argv[1]
#     start_date = sys.argv[2]
#     end_date = sys.argv[3]

#     try:
#         forex_data = fetch_forex_data(ticker, start_date, end_date)
#         print(json.dumps(forex_data))
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))
#         sys.exit(1)




import yfinance as yf
import pandas as pd
import sys
import json

def fetch_forex_data(ticker, start, end):
    data = yf.download(ticker, start=start, end=end)
    return data.to_dict(orient='records')

def fetch_cashflow_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        cashflow = stock.financials.transpose().to_dict(orient='records')
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














# import sys
# import json
# import yfinance as yf
# import pandas as pd

# def fetch_forex_data(ticker, start, end):
#     data = yf.download(ticker, start=start, end=end)
#     return data.to_dict(orient='records')


# def fetch_cash_flow_data(ticker):
#     try:
#         data = yf.Ticker(ticker).cashflow
#         data.index = data.index.map(lambda x: x.strftime('%Y-%m-%d') if isinstance(x, pd.Timestamp) else str(x))
#         data.columns = data.columns.map(lambda x: x.strftime('%Y-%m-%d') if isinstance(x, pd.Timestamp) else str(x))
#         cash_flow_dict = data.reset_index().to_dict(orient='records')
#         cash_flow_json = json.dumps(cash_flow_dict, indent=4)
#         return cash_flow_json
#     except Exception as e:
#         # Log or handle the error appropriately
#         print(f"Error fetching cash flow data: {e}")
#         return json.dumps({"error": str(e)}, indent=4)

# # def fetch_cash_flow_data(ticker):
# #     data = yf.Ticker(ticker).cashflow
# #     print("Data Types:\n", data.dtypes)  # Debugging line
# #     print("Data:\n", data.head())        # Debugging line
# #     # Convert columns (which are timestamps) to strings
# #     data.columns = data.columns.map(lambda x: x.strftime('%Y-%m-%d') if isinstance(x, pd.Timestamp) else str(x))
# #     # Convert the DataFrame to a dictionary
# #     cash_flow_dict = data.reset_index().to_dict(orient='records')
# #     return cash_flow_dict

# if __name__ == "__main__":
#     if len(sys.argv) != 4:
#         print(json.dumps({"error": "Ticker, start, and end dates are required"}))
#         sys.exit(1)

#     ticker = sys.argv[1]
#     start_date = sys.argv[2]
#     end_date = sys.argv[3]

#     try:
#         forex_data = fetch_forex_data(ticker, start_date, end_date)
#         cash_flow_data = fetch_cash_flow_data(ticker)
    
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))
#         sys.exit(1)




#     # try:
#     #     forex_data = fetch_forex_data(ticker, start_date, end_date)
#     #     cash_flow_data = fetch_cash_flow_data(ticker)
#     #     result = {
#     #         "forex_data": forex_data,
#     #         "cash_flow_data": cash_flow_data
#     #     }
#     #     print(json.dumps(result, indent=2))
#     # except Exception as e:
#     #     print(json.dumps({"error": str(e)}))
#     #     sys.exit(1)


