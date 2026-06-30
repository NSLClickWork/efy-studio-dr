import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(file_path):
    if not os.path.exists(file_path):
        return f"File {file_path} not found."
    try:
        with zipfile.ZipFile(file_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # Namespace for Word processing XML
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            # Extract all text elements
            texts = []
            for elem in tree.iter():
                if elem.tag.endswith('t'):
                    if elem.text:
                        texts.append(elem.text)
            
            return "".join(texts)
    except Exception as e:
        return f"Error reading {file_path}: {e}"

downloads = r"C:\Users\khoin\Downloads"
files_to_check = [
    "nội dung slide.docx",
    "NSL_Plan_Tom (Khoi).docx",
    "NSL_Plan_Blob.docx",
    "NSL_Plan_Sharkie.docx",
    "Kaffee Kampagne & NSL.docx",
    "NSL_IT_Team_Structure.docx",
    "NSL_AI_Bot_Roadmap_100_with_Cost_Estimates.docx",
    "NSL_Bot_Consolidation_Plan_EN.docx"
]

for filename in files_to_check:
    path = os.path.join(downloads, filename)
    if os.path.exists(path):
        text = read_docx(path)
        print(f"=== FILE: {filename} (Length: {len(text)}) ===")
        print(text[:1000]) # print first 1000 characters
        print("\n" + "="*40 + "\n")
