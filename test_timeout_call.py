import os
from google import genai

api_key = os.environ.get("API_KEY")
try:
    client = genai.Client(api_key=api_key, http_options={'timeout': 600.0})
    print("Client initialized successfully with dict!")
except Exception as e:
    print("Failed to initialize with dict:", e)

try:
    from google.genai import types
    client = genai.Client(api_key=api_key, http_options=types.HttpOptions(timeout=600.0))
    print("Client initialized successfully with types.HttpOptions!")
except Exception as e:
    print("Failed to initialize with types.HttpOptions:", e)
