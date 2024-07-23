from bs4 import BeautifulSoup
import requests
import sys
import json

def scrape_stock_price(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        return {"error": f"Request failed: {e}"}

    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        stock_price = soup.find('fin-streamer', {'data-testid': 'qsp-price'}).find('span').text
        return {"stock_price": stock_price}
    except AttributeError as e:
        return {"error": f"Failed to parse HTML: {e}"}

def scrape_historical_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        return {"error": f"Request failed: {e}"}

    soup = BeautifulSoup(response.content, 'html.parser')
    rows = soup.select('tr.svelte-ewueuo')

    data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) == 7:
            date = cols[0].text
            open_price = cols[1].text
            high = cols[2].text
            low = cols[3].text
            close = cols[4].text
            adj_close = cols[5].text
            volume = cols[6].text.replace(',', '')
            data.append({
                "date": date,
                "open": float(open_price),
                "high": float(high),
                "low": float(low),
                "close": float(close),
                "adj_close": float(adj_close),
                "volume": int(volume)
            })
    
    return data

if __name__ == "__main__":
    mode = sys.argv[1]
    url = sys.argv[2]
    if mode == "live":
        data = scrape_stock_price(url)
    elif mode == "historical":
        data = scrape_historical_data(url)
    else:
        data = {"error": "Invalid mode"}
    print(json.dumps(data))
