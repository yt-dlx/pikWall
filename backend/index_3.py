# ==================================================XXX==================================================
"""                                           This Code Is Used To Introduce Noise In The Upscaled Files In The Environment                                             """
# ==================================================XXX==================================================
import os
import subprocess
Amount = 20
source_folders = [
    os.path.join("sources", "input", "Anime"),
    os.path.join("sources", "input", "Portrait"),
    os.path.join("sources", "input", "Lightning"),
    os.path.join("sources", "input", "Cinematic"),
    os.path.join("sources", "input", "Photography")
]
destination_folders = [
    os.path.join("sources", "output", "Anime", "noised"),
    os.path.join("sources", "output", "Portrait", "noised"),
    os.path.join("sources", "output", "Lightning", "noised"),
    os.path.join("sources", "output", "Cinematic", "noised"),
    os.path.join("sources", "output", "Photography", "noised")
]
for folder in destination_folders:
    os.makedirs(folder, exist_ok=True)
for source_folder, destination_folder in zip(source_folders, destination_folders):
    for filename in os.listdir(source_folder):
        if filename.lower().endswith((".png", ".jpg", ".jpeg")):
            ffmpeg_path = os.path.join("include", "ffmpeg.exe")
            source_path = os.path.join(source_folder, filename)
            destination_path = os.path.join(destination_folder, filename)
            if filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg"):
                command = [
                    ffmpeg_path, "-i", f'"{source_path}"',
                    "-vf", f"noise=alls={Amount}:allf=t",
                    "-q:v", "2", f'"{destination_path}"'
                ]
            elif filename.lower().endswith(".png"):
                command = [
                    ffmpeg_path, "-i", f'"{source_path}"',
                    "-vf", f"noise=alls={Amount}:allf=t",
                    "-compression_level", "0", f'"{destination_path}"'
                ]
            try:
                subprocess.run(" ".join(command), shell=True, check=True)
                print(f"Processed and saved: {destination_path}")
            except subprocess.CalledProcessError as e:
                print(f"Error processing {source_path}: {e}")
# ==================================================XXX==================================================