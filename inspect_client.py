import inspect
from google import genai

print("Client init signature:")
print(inspect.signature(genai.Client.__init__))

