# ==================================================XXX==================================================
"""                           This Code Is Used To Create A 1080p downscaled LowRes Images from Label Images                                                 """
# ==================================================XXX==================================================
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
                img_resized = img.resize((width, height), Image.LANCZOS)
                target_path = os.path.join(target_dir, filename)
                img_resized.save(target_path)
                print(f"Rescaled and saved: {target_path}")
        except Exception as e:
            print(f"Failed to process {file_path}: {e}")

if __name__ == "__main__":
    print("Choose the image format:")
    print("1: Landscape (640 x 360)")
    print("2: Portrait (360 x 640)")
    choice = input("Enter 1 for Landscape or 2 for Portrait: ")
    if choice == "1":
        width, height = 640, 360
    elif choice == "2":
        width, height = 360, 640
    else:
        print("Invalid choice. Exiting the program.")
        exit()
# ==================================================XXX==================================================
    source_dir = os.path.join("sources", "output", "Anime", "highRes")
    # source_dir = os.path.join("sources", "output", "Portrait", "highRes")
    # source_dir = os.path.join("sources", "output", "Lightning", "highRes")
    # source_dir = os.path.join("sources", "output", "Cinematic", "highRes")
    # source_dir = os.path.join("sources", "output", "Photography", "highRes")
# ==================================================XXX==================================================
    # target_dir = os.path.join("sources", "output", "Photography", "lowRes")
    # target_dir = os.path.join("sources", "output", "Cinematic", "lowRes")
    # target_dir = os.path.join("sources", "output", "Lightning", "lowRes")
    # target_dir = os.path.join("sources", "output", "Portrait", "lowRes")
    target_dir = os.path.join("sources", "output", "Anime", "lowRes")
# ==================================================XXX==================================================
    rescale_images(source_dir, target_dir, width, height)
# ==================================================XXX==================================================