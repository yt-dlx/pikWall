# ==================================================XXX==================================================
"""                               This Code Is Used To Extract Dominant Colors From The Upscaled Files In The Environment                                   """
# ==================================================XXX==================================================
import re
import os
import json
from PIL import Image
from rich.console import Console
from colorthief import ColorThief
console = Console()
def create_temp_resized_image(file_path, size=(300, 300)):
    with Image.open(file_path) as img:
        img.thumbnail(size)
        temp_path = "Tri.jpg"
        img.save(temp_path, "JPEG")
    return temp_path
def get_top_colors(file_path, num_colors=50):
    color_thief = ColorThief(file_path)
    palette = color_thief.get_palette(color_count=num_colors, quality=1)
    hex_colors = [f"#{r:02x}{g:02x}{b:02x}" for r, g, b in palette]
    return hex_colors
def get_image_metadata(file_path):
    with Image.open(file_path) as img:
        return {"format": img.format, "mode": img.mode, "width": img.width, "height": img.height}
def print_colors_in_terminal(hex_colors):
    console.print("[bold green]INFO:[/] [#ffffff]Displaying all extracted colors:")
    for color in hex_colors:
        console.print(f"[bold {color} on {color}]{color}[/] [#ffffff]", end=" ")
    console.print("\n")
def create_json_for_image(file_path):
    temp_file_path = create_temp_resized_image(file_path)
    try:
        hex_colors = get_top_colors(temp_file_path, num_colors=50)
    finally:
        os.remove(temp_file_path)
    file_metadata = get_image_metadata(file_path)
    file_size_bytes = os.path.getsize(file_path)
    file_size_megabytes = file_size_bytes / (1024 * 1024)
    directory, original_name = os.path.split(file_path)
    base, _ = os.path.splitext(original_name)
    image_data = {
        "original_file_name": original_name,
        "format": file_metadata["format"],
        "mode": file_metadata["mode"],
        "file_size_bytes": file_size_bytes,
        "file_size_megabytes": round(file_size_megabytes, 2),
        "width": file_metadata["width"],
        "height": file_metadata["height"],
        "primary": hex_colors[0],
        "secondary": hex_colors[1],
        "tertiary": hex_colors[2],
    }
    for i, color in enumerate(hex_colors[3:], start=4):
        if i <= 50:
            image_data[f"more_{i}"] = color
    return image_data
def process_images_in_folder(folder_path):
    image_data_dict = {}
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        if os.path.isfile(file_path) and file_name.lower().endswith((".jpg", ".jpeg", ".png")):
            try:
                image_data = create_json_for_image(file_path)
                base_name = re.sub(r'\s*\(\d+\)$', '', os.path.splitext(file_name)[0]).strip()
                if base_name not in image_data_dict:
                    image_data_dict[base_name] = []
                image_data_dict[base_name].append(image_data)
                console.print(f"[bold green]INFO:[/] Processed image: {file_name}")
            except Exception as e:
                console.print(f"[bold red]ERROR:[/] Could not process {file_name}. {str(e)}")
    output_json_path = "DataBook.json"
    with open(output_json_path, "w") as json_file:
        json.dump(image_data_dict, json_file, indent=4)
    console.print(f"[bold green]INFO:[/] All image data has been written to {output_json_path}")
process_images_in_folder(os.path.join("sources", "base"))
# ==================================================XXX==================================================