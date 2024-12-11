# ==================================================XXX==================================================
"""                                  This Code Is Used To Pre-Process, Crop And Move Original Files In The Environment                                             """
# ==================================================XXX==================================================
import os
from PIL import Image, ImageEnhance
output_dir = os.path.join("sources", "assets")
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
for filename in os.listdir("chrome"):
    input_path = os.path.join("chrome", filename)
    if filename.lower().endswith(("png", "jpg", "jpeg")):
        with Image.open(input_path) as img:
            img_resized = img.resize((2048, 1152))
            enhancer_sharpness = ImageEnhance.Sharpness(img_resized)
            img_sharp = enhancer_sharpness.enhance(1.5) 
            enhancer_saturation = ImageEnhance.Color(img_sharp)
            img_saturated = enhancer_saturation.enhance(1.0)
            enhancer_contrast = ImageEnhance.Contrast(img_saturated)
            img_contrasted = enhancer_contrast.enhance(1.0)
            output_path = os.path.join(output_dir, filename)
            img_contrasted.save(output_path)
# ==================================================XXX==================================================