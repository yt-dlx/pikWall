# ==================================================XXX==================================================
"""                                                                   This Code Is Used To Update The Database.js File With Base64 Links                                         """
# ==================================================XXX==================================================
import os
import json
import base64
from pathlib import Path
def encode_base64(input_string):
    return base64.b64encode(input_string.encode()).decode()
input_ts_file = "database.ts"
base_download_url = "https://github.com/yt-dlx/picbook/blob/highRes/"
base_preview_url = "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/"
def load_database_from_ts(file_path):
    with open(file_path, "r") as file:
        content = file.read()
        json_data = content.split("export const database: unknown[] = ", 1)[1].strip(";\n")
        return json.loads(json_data)
def process_images(database):
    for story in database:
        for env_key, env_value in story.items():
            if "images" in env_value:
                for image in env_value["images"]:
                    image_name = image["original_file_name"]
                    download_link = f"{base_download_url}{image_name}?raw=true"
                    preview_link = f"{base_preview_url}{image_name}"
                    image["downloadLink"] = encode_base64(download_link)
                    image["previewLink"] = encode_base64(preview_link)
    return database
def save_database_to_ts(database, file_path):
    with open(file_path, "w") as file:
        file.write("export const database: unknown[] = ")
        file.write(json.dumps(database, indent=4).replace("true", "True").replace("false", "False"))
        file.write(";")
if __name__ == "__main__":
    try:
        database = load_database_from_ts(input_ts_file)
        updated_database = process_images(database)
        save_database_to_ts(updated_database, input_ts_file)
        print("[INFO] Updated database.ts successfully!")
    except Exception as e:
        print(f"[ERROR] An error occurred: {str(e)}")
# ==================================================XXX==================================================