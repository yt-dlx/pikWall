# ==================================================XXX==================================================
"""              This Code Is Used To Reduce FileSize And Re-Scale To 8192x4608 The Upscaled Files In The Environment                               """
# ==================================================XXX==================================================
import os
from PIL import Image
def upscale_and_rename_images_in_folder(source_folder, target_folder, target_size=(8192, 4608)):
    if not os.path.exists(target_folder):
        os.makedirs(target_folder)
    for filename in os.listdir(source_folder):
        if filename.lower().endswith((".png", ".jpg", ".jpeg")):
            input_path = os.path.join(source_folder, filename)
            base_name, ext = os.path.splitext(filename)
            base_name_title_case = base_name.title()
            new_filename = base_name_title_case + ext
            output_path = os.path.join(target_folder, new_filename)
            with Image.open(input_path) as img:
                img_resized = img.resize(target_size, Image.LANCZOS)
                img_resized.save(output_path)
                print(f"Resized and saved: {new_filename}")
source_folder = os.path.join("sources", "assets")
target_folder = os.path.join("sources", "re-assets")
upscale_and_rename_images_in_folder(source_folder, target_folder)
# ==================================================XXX==================================================