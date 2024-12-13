import json
import base64
def encode_base64(input_string):
    return base64.b64encode(input_string.encode()).decode()
file_path = "DataBook.json"
with open(file_path, "r") as file:
    data = json.load(file)
base_download_url = "https://github.com/yt-dlx/picbook/blob/highRes/"
base_preview_url = "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/"
for story in data.values():
    for image in story.get("images", []):
        image_name = image["original_file_name"]
        download_link = f"{base_download_url}{image_name}?raw=true"
        preview_link = f"{base_preview_url}{image_name}"
        image["downloadLink"] = encode_base64(download_link)
        image["previewLink"] = encode_base64(preview_link)
with open(file_path, "w") as file:
    json.dump(data, file, indent=4)
print("Updated JSON file successfully!")