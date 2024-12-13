import os
from PIL import Image

def rescale_images(source_dir, target_dir, width, height):
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
    for filename in os.listdir(source_dir):
        file_path = os.path.join(source_dir, filename)
        if not (filename.lower().endswith((".png", ".jpg", ".jpeg"))):
            continue
        try:
            with Image.open(file_path) as img:
                img_resized = img.resize((width, height), Image.ANTIALIAS)
                target_path = os.path.join(target_dir, filename)
                img_resized.save(target_path)
                print(f"Rescaled and saved: {target_path}")
        except Exception as e:
            print(f"Failed to process {file_path}: {e}")
if __name__ == "__main__":
    source_directory = os.path.join("sources", "highRes")
    target_directory = os.path.join("sources", "lowRes")
    target_width = 1920
    target_height = 1080
    rescale_images(source_directory, target_directory, target_width, target_height)