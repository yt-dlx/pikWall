# ==================================================XXX==================================================
"""                                  This Code Is Used To Pre-Process, Crop And Move Original Files In The Environment                                             """
# ==================================================XXX==================================================
import os
from PIL import Image, ImageEnhance
output_dir = os.path.join("sources", "images", "Anime", "output")
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
for filename in os.listdir("download"):
    input_path = os.path.join("download", filename)
    if filename.lower().endswith(("png", "jpg", "jpeg")):
        with Image.open(input_path) as img:
            img_resized = img.resize((2048, 1152))
            enhancer_sharpness = ImageEnhance.Sharpness(img_resized)
            img_sharp = enhancer_sharpness.enhance(2.5) 
            enhancer_saturation = ImageEnhance.Color(img_sharp)
            img_saturated = enhancer_saturation.enhance(1.1)
            enhancer_contrast = ImageEnhance.Contrast(img_saturated)
            img_contrasted = enhancer_contrast.enhance(1.1)
            output_path = os.path.join(output_dir, filename)
            img_contrasted.save(output_path)
# ==================================================XXX==================================================