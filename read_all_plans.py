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
            paragraphs = []
            for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                p_text = []
                for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    if t.text:
                        p_text.append(t.text)
                if p_text:
                    paragraphs.append("".join(p_text))
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading {file_path}: {e}"

downloads = r"C:\Users\khoin\Downloads"

print("--- NSL_Plan_Tom (Khoi).docx ---")
print(read_docx(os.path.join(downloads, "NSL_Plan_Tom (Khoi).docx")))
print("\n" + "="*50 + "\n")

print("--- Kaffee Kampagne & NSL.docx ---")
print(read_docx(os.path.join(downloads, "Kaffee Kampagne & NSL.docx")))
print("\n" + "="*50 + "\n")
