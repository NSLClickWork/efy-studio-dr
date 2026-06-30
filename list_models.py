import os
import google.generativeai as genai

api_key = os.environ.get("API_KEY")
if api_key:
    genai.configure(api_key=api_key)
    print("Listing models:")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
    except Exception as e:
        print("Error listing models:", e)
else:
    print("API_KEY not found.")
