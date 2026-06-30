from google.genai._api_client import get_timeout_in_seconds, populate_server_timeout_header

headers = {}
populate_server_timeout_header(headers, 600.0)
print("Headers for 600.0 seconds:")
print(headers)

headers2 = {}
populate_server_timeout_header(headers2, 10.0)
print("Headers for 10.0 seconds:")
print(headers2)
