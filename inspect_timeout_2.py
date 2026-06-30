import os
from google import genai
import inspect

api_key = os.environ.get("API_KEY")
client = genai.Client(api_key=api_key)

print("inspecting _build_request:")
try:
    print(inspect.getsource(client._api_client._build_request))
except Exception as e:
    print("Error:", e)

print("\ninspecting _request:")
try:
    print(inspect.getsource(client._api_client._request))
except Exception as e:
    print("Error:", e)
