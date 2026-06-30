import re

with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    content = f.read()

fills = set(re.findall(r'fill="([^"]+)"', content))
print('Fills found:', fills)
