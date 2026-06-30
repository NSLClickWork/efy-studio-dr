import os
from google import genai

api_key = os.environ.get("API_KEY")
client = genai.Client(api_key=api_key)

image_names = ['ball.webp', 'reformer.webp', 'barre.webp', 'mat.webp', 'hero.png', 'prenatal.webp']
contents = ["Please briefly describe each of these images, focusing on what kind of exercise is being shown (reformer, barre, mat, etc.), how many people are in it, and what they are wearing. \n"]

for img in image_names:
    path = os.path.join(r"d:\efy-studio\public\images", img)
    print(f"Uploading {path}...")
    f = client.files.upload(file=path)
    contents.append(f"Image {img}: ")
    contents.append(f)

print("Generating description...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=contents
)
print(response.text)
