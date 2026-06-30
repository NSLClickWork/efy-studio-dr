with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    content = f.read()

before = len(content)

# Remove background fills - replace with transparent
content = content.replace('fill="#ede8e0"', 'fill="none"')
content = content.replace('fill="#ffffff"', 'fill="none"')
content = content.replace('fill="#faf6f1"', 'fill="none"')

with open('public/images/logo.svg', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Done. Changed {before - len(content)} chars.')
