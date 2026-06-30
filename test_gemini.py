import os
import google.generativeai as genai

api_key = os.environ.get("API_KEY")
print("API Key exists:", api_key is not None)
if api_key:
    # Set the key in genai
    genai.configure(api_key=api_key)
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content("Hello! Are you working?")
        print("Response from Gemini 1.5 Flash:")
        print(response.text)
    except Exception as e:
        print("Error calling Gemini API:", e)
else:
    print("API_KEY env variable is missing or empty.")
