import os
from google import genai
import inspect
from google.genai._api_client import get_timeout_in_seconds, populate_server_timeout_header

print("Source code of get_timeout_in_seconds:")
try:
    print(inspect.getsource(get_timeout_in_seconds))
except Exception as e:
    print("Error:", e)

print("\nSource code of populate_server_timeout_header:")
try:
    print(inspect.getsource(populate_server_timeout_header))
except Exception as e:
    print("Error:", e)
