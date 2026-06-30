import os
import time
import google.generativeai as genai

# Configure the API key
api_key = os.environ.get("API_KEY")
if not api_key:
    print("API_KEY environment variable is not set!")
    exit(1)

genai.configure(api_key=api_key)

audio_path = r"C:\Users\khoin\Downloads\nsl_audio_64k.mp3"
if not os.path.exists(audio_path):
    print(f"Error: {audio_path} does not exist yet. Please wait for audio extraction.")
    exit(1)

print("Uploading audio file to Gemini...")
# Upload the audio file
audio_file = genai.upload_file(path=audio_path)
print(f"Uploaded file: {audio_file.name}")

# Wait for the file to be processed
print("Waiting for file processing to complete...")
while audio_file.state.name == "PROCESSING":
    print(".", end="", flush=True)
    time.sleep(5)
    audio_file = genai.get_file(audio_file.name)

if audio_file.state.name == "FAILED":
    raise ValueError(f"File processing failed: {audio_file.error.message}")

print(f"\nFile is ready. State: {audio_file.state.name}")

# Ask Gemini to analyze the meeting
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

# Use gemini-3.5-flash for fast and accurate multimodal reasoning
print("Sending request to gemini-3.5-flash...")
model = genai.GenerativeModel("gemini-3.5-flash")
response = model.generate_content([audio_file, prompt])

output_path = r"C:\Users\khoin\Downloads\video_analysis_vietnamese.md"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(response.text)

print("\nAnalysis completed and saved to C:\\Users\\khoin\\Downloads\\video_analysis_vietnamese.md")
print("Response preview:")
print(response.text[:2000])

# Clean up file from Gemini servers
print("Cleaning up file from Gemini...")
genai.delete_file(audio_file.name)
print("Done!")
