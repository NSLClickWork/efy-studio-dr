import os
from google import genai

api_key = os.environ.get("API_KEY")
print("API_KEY:", api_key[:10] + "..." if api_key else "None")

try:
    # Initialize the client. The new SDK uses GEMINI_API_KEY, but we can pass api_key explicitly
    client = genai.Client(api_key=api_key)
    
    print("Testing generate_content...")
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents='Hello! Please reply in one word.',
    )
    print("Success:", response.text)
    
    # Try uploading a tiny test file
    test_file_path = "test_upload.txt"
    with open(test_file_path, "w") as f:
        f.write("This is a test upload file.")
        
    print("Testing files.upload...")
    uploaded_file = client.files.upload(file=test_file_path)
    print("Upload success! File name:", uploaded_file.name)
    
    # Clean up
    client.files.delete(name=uploaded_file.name)
    os.remove(test_file_path)
    print("Clean up done!")
    
except Exception as e:
    print("Error occurred:")
    import traceback
    traceback.print_exc()
