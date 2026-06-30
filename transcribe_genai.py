import os
import time
from google import genai
from google.genai import types

# Configure the API key
api_key = os.environ.get("API_KEY")
if not api_key:
    print("API_KEY environment variable is not set!")
    exit(1)

client_upload = genai.Client(api_key=api_key)
client_gen = genai.Client(api_key=api_key, http_options={'timeout': 600000.0})

audio_path = r"C:\Users\khoin\Downloads\nsl_audio_64k.mp3"
if not os.path.exists(audio_path):
    print(f"Error: {audio_path} does not exist. Please run audio extraction first.")
    exit(1)

print(f"Uploading audio file: {audio_path} (~40MB)...")
start_time = time.time()
uploaded_file = client_upload.files.upload(file=audio_path)
print(f"Upload completed in {time.time() - start_time:.2f} seconds.")
print(f"File name: {uploaded_file.name}")

print("Waiting for file processing to complete...")
while True:
    file_info = client_upload.files.get(name=uploaded_file.name)
    state = file_info.state
    print(f"File state: {state}")
    if state == "ACTIVE":
        break
    elif state == "FAILED":
        raise ValueError(f"File processing failed: {file_info.error.message if hasattr(file_info, 'error') else 'Unknown error'}")
    time.sleep(5)

print("File is ACTIVE! Requesting analysis...")

prompt = """
Đây là bản ghi âm cuộc họp của dự án NSL Click & Work. 
Hãy phân tích nội dung cuộc họp trực tiếp từ file âm thanh này để đảm bảo độ chính xác cao nhất (không dựa vào các bản transcript lỗi khác). 

Hãy trả lời bằng tiếng Việt và bao gồm các phần sau:
1. Tóm tắt nội dung cuộc họp chính (Cuộc họp nói về cái gì, mục tiêu là gì).
2. Chi tiết các nội dung thảo luận quan trọng:
   - Việc tích hợp website Wix với Zoho CRM (Make.com, webhooks, tracking GA4/Clarity).
   - Lựa chọn CRM (Tại sao chọn Zoho, so sánh với các CRM khác).
   - Chiến dịch "Search and Win" và campaign Coffee.
   - Việc thuê Senior Zoho Architect / Developer freelance.
3. Chi tiết ý kiến, phản hồi và phát biểu của từng thành viên tham gia cuộc họp (Moritz, Carl, Khôi, Sharkie/Tien, Weirdie). Đặc biệt chú ý xem Khôi phát biểu những gì.
4. Danh sách các công việc (tasks) cụ thể cần thực hiện của từng người trong team sau cuộc họp này.
"""

models_to_try = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash']
response = None
for model_name in models_to_try:
    try:
        print(f"Sending request to {model_name}...")
        response = client_gen.models.generate_content(
            model=model_name,
            contents=[uploaded_file, prompt]
        )
        print(f"Success with {model_name}!")
        break
    except Exception as e:
        print(f"Error with {model_name}: {e}")
        print("Retrying with next model...")
        time.sleep(2)

if response is None:
    print("All models failed!")
    exit(1)

output_path = r"C:\Users\khoin\Downloads\video_analysis_vietnamese.md"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(response.text)

print(f"\nAnalysis completed and saved to {output_path}")
print("Response preview:")
print(response.text[:2000])

# Clean up file from Gemini servers
print("Deleting file from Gemini...")
client_upload.files.delete(name=uploaded_file.name)
print("Done!")
