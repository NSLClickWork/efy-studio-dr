import os
from google import genai
from google.genai import types
import inspect

api_key = os.environ.get("API_KEY")

# Let's inspect the HttpOptions class properties
print("HttpOptions class attributes:")
print(dir(types.HttpOptions))

# Let's print the source code of client._api_client.request to see how http_options is processed
client = genai.Client(api_key=api_key)
try:
    source = inspect.getsource(client._api_client.request)
    print("API Client request method source code:")
    print(source[:2000]) # First 2000 chars of the source code
except Exception as e:
    print("Could not get source of client._api_client.request:", e)
