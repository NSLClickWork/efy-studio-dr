import os
from google import genai
from google.genai import types

api_key = os.environ.get("API_KEY")
client = genai.Client(api_key=api_key)

try:
    # Create a small text file
    test_content = b"Hello, this is inline text data."
    
    print("Testing inline data content generation...")
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            types.Part.from_bytes(
                data=test_content,
                mime_type="text/plain",
            ),
            "What is the content of the attached text? Reply in one short sentence."
        ]
    )
    print("Success! Response:")
    print(response.text)
except Exception as e:
    print("Error during inline generation:")
    import traceback
    traceback.print_exc()
