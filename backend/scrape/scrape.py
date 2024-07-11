from bs4 import BeautifulSoup
import requests
import sys
import json

def scrape(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Example: Extract all paragraph texts
    paragraphs = [p.text for p in soup.find_all('p')]
    
    return paragraphs

if __name__ == "__main__":
    url = sys.argv[1]
    data = scrape(url)
    print(json.dumps(data))
