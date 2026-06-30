from PIL import Image
img = Image.open('public/images/hero.png')
width, height = img.size
print(f'Image size: {width}x{height}')
black_col_count = 0
for x in range(width-1, -1, -1):
    col_pixels = [img.getpixel((x, y)) for y in range(0, height, height//10)]
    if all(p == (0,0,0) or p == (1,1,1) or p == (2,2,2) or (isinstance(p, tuple) and p[0]<5) for p in col_pixels):
        black_col_count += 1
    else:
        break
print(f'Black bar width on right: {black_col_count} pixels')

black_col_count_left = 0
for x in range(0, width):
    col_pixels = [img.getpixel((x, y)) for y in range(0, height, height//10)]
    if all(p == (0,0,0) or p == (1,1,1) or p == (2,2,2) or (isinstance(p, tuple) and p[0]<5) for p in col_pixels):
        black_col_count_left += 1
    else:
        break
print(f'Black bar width on left: {black_col_count_left} pixels')
