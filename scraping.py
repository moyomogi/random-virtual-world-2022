#!/usr/bin/python3
# このコードで生成した authorsDict は plugins/define.js で使用しています。
# このコードは、他の全てのファイルから独立しており、単体で実行可能です。
# Usage:
#   $ python3 scraping.py
#   $ python3 scraping.py 2>/dev/null

# https://oxylabs.io/blog/python-web-scraping
import requests
import sys
from bs4 import BeautifulSoup

url = "https://ch-random.net/authors/"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# https://realpython.com/beautiful-soup-web-scraper-python/
# 以下は等価
# - soup.find("img", class_="my-portrait")
# - soup.select("img.my-portrait")

footers = soup.select("div.projects-container")

# 生成したいもの
# const authorsDict = {
#   yomog: {
#     year: 1,
#     name: "よもぎ",
#     icon: "https://ch-random.net/authors/yomog/avatar_hue523f5c0a45e10cf0e33f8e085b52548_162276_250x250_fill_lanczos_center_2.png",
#   },
#   // ...
# };
print("const authorsDict = {")

for (i, footer) in enumerate(footers[:3]):
    print(f"  // {i + 1} 回生", file=sys.stderr)
    h4s = footer.select("h4")
    imgs = footer.select("img.my-portrait")
    for j in range(len(h4s)):
        # https://stackoverflow.com/questions/55385113/how-do-i-scrape-image-src-in-beautifulsoup
        src = str(imgs[j].get("src"))
        author = src.split("/")[2]
        print(f"  {author}: {{")
        print(f'    year: {i + 1},')
        print(f'    name: "{h4s[j].text}",')
        print(f'    icon: "https://ch-random.net{src}",')
        print("  },")

print("};")
