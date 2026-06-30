with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace viewBox
content = content.replace('viewBox="0 0 1500 1499.999933"', 'viewBox="400 388 700 700"')
# Replace width/height
content = content.replace('width="2000"', 'width="700"').replace('height="2000"', 'height="700"')

with open('public/images/logo.svg', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated SVG viewBox")
