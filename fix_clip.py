with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace viewBox
content = content.replace('viewBox="400 388 700 700"', 'viewBox="340 340 820 820"')
# Replace width/height
content = content.replace('width="700"', 'width="820"').replace('height="700"', 'height="820"')

with open('public/images/logo.svg', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated SVG viewBox to fix clipping")
