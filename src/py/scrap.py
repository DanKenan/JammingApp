from bs4 import BeautifulSoup
from urllib.request import urlopen, Request
import re
import json

def is_allowed_url(url):
    # Check if the URL matches the disallowed pattern
    return not re.match(r'^https://www\.nigunmusic\.com/catalogsearch/result/.*$', url)

url = "https://www.nigunmusic.com/artist"

if is_allowed_url(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}
    req = Request(url, headers=headers)
    page = urlopen(req)
    html_bytes = page.read()
    html = html_bytes.decode("utf-8")
    #Getting only the anchor tags containig artist names
    start_index = html.find("<h3>ALL Artists</h3>")
    end_index = html.find("</main><footer ")
    artist = html[start_index:end_index]

    #taking only names from the tags
    soup = BeautifulSoup(artist, "html.parser")
    a_tags = soup.find_all("a")
    names = [a.get_text() for a in a_tags]

    # Create a dictionary with the names
    data = {'names': names}

    # Save the data to a JSON file
    with open('names.json', 'w') as json_file:
        json.dump(data, json_file)


else:
    print("This URL is disallowed by robots.txt")

