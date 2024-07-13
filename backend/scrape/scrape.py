# from bs4 import BeautifulSoup
# import requests
# import sys
# import json

# def scrape_stock_price(url):
#     try:
#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')
#         stock_price = soup.find('fin-streamer', {'data-testid': 'qsp-price'}).find('span').text
#         return {"stock_price": stock_price}
#     except Exception as e:
#         return {"error": str(e)}

# if __name__ == "__main__":
#     url = sys.argv[1]
#     data = scrape_stock_price(url)
#     print(json.dumps(data))


from bs4 import BeautifulSoup
import requests
import sys
import json

def scrape_stock_price(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
    except requests.RequestException as e:
        return {"error": f"Request failed: {e}"}

    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        stock_price = soup.find('fin-streamer', {'data-testid': 'qsp-price'}).find('span').text
        return {"stock_price": stock_price}
    except AttributeError as e:
        return {"error": f"Failed to parse HTML: {e}"}

if __name__ == "__main__":
    url = sys.argv[1]
    data = scrape_stock_price(url)
    print(json.dumps(data))


