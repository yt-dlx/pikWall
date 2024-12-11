# ==================================================XXX==================================================
"""                                           This Code Is Used To Rename And Sort The Base Files The Environment                                                           """
# ==================================================XXX==================================================
import os
startNum = 0
folder_path = "chrome"
files = os.listdir(folder_path)
files.sort()
for index, file in enumerate(files):
    if file.lower().endswith(".jpg"):
        new_name = f"picbook_A_({startNum + index}).jpg"
        old_path = os.path.join(folder_path, file)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed: {file} -> {new_name}")
print("Renaming completed.")
# ==================================================XXX==================================================