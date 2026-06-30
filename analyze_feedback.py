import os
import time
from google import genai
from google.genai import types

api_key = os.environ.get("API_KEY")
if not api_key:
    print("API_KEY environment variable is not set!")
    exit(1)

client = genai.Client(api_key=api_key)

video_path = r"C:\Users\khoin\Downloads\WhatsApp Video 2026-06-29 at 17.03.04.mp4"

print("Uploading video...")
video_file = client.files.upload(file=video_path)

print(f"Completed upload: {video_file.uri}")
while video_file.state.name == "PROCESSING":
    print('.', end='')
    time.sleep(2)
    video_file = client.files.get(name=video_file.name)

if video_file.state.name == "FAILED":
    raise ValueError(video_file.state.name)

print("\nVideo processing complete.")
prompt = """
This is a feedback video from a client pointing at an iPad screen showing a website.
Please carefully transcribe exactly what the client is pointing at, what they are saying (or if there's no audio, what they are pointing at and the context).
Pay close attention to any images, logos, or sections they point to, and what they expect to be changed.
Provide a highly detailed analysis of every single bug or change they are requesting.
Especially note anything about:
- Images being wrong (describe the images)
- Missing videos or missing images
- Logo changes
- Any missing or incorrect sections
"""

response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=[video_file, prompt]
)

print(response.text)
