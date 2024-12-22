import os
from PIL import Image

base_image_path = [
    "./assets/picbook/picbook_black_bg.png",
    "./assets/picbook/picbook_black_nobg.png",
    "./assets/picbook/picbook_white_bg.png",
    "./assets/picbook/picbook_white_nobg.png"
]
output_sizes = {
    "favicon_64x64.png": (64, 64),
    "favicon_48x48.png": (48, 48),
    "splash_3200x3200.png": (3200, 3200),
    "app_icon_1024x1024.png": (1024, 1024),
    "android_foreground_108x108.png": (108, 108),
}
output_files = []
for img in base_image_path:
    try:
        base_image = Image.open(img)
        base_name = os.path.splitext(os.path.basename(img))[0]
        output_folder = f"./assets/picbook/splash/{base_name}"
        os.makedirs(output_folder, exist_ok=True)
        for filename, size in output_sizes.items():
            resized_image = base_image.resize(size, Image.LANCZOS)
            output_path = os.path.join(output_folder, filename)
            resized_image.save(output_path)
            output_files.append(output_path)
    except FileNotFoundError:
        output_files = "Base image file not found. Ensure the path is correct."