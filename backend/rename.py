import os

# Define the directory where the files are located
directory = os.path.join("database")

# Function to convert filename into the desired format
def generate_new_name(old_name):
    # Remove "Leonardo_Anime_XL_Title_" prefix
    base_name = old_name.replace("Leonardo_Anime_XL_Title_", "")
    # Remove the trailing number and file extension
    parts = base_name.rsplit("_", 1)
    if len(parts) == 2:
        base_name = parts[0].replace("_", " ").strip()
        # Extract the number and format it as (number)
        number = int(parts[1].split(".")[0]) + 1
        return f"{base_name} ({number}).jpg"
    return None  # Skip files that don't match the pattern

# Iterate through files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        # Generate the new name
        new_name = generate_new_name(filename)
        if new_name:
            old_file = os.path.join(directory, filename)
            new_file = os.path.join(directory, new_name)
            # Rename the file
            os.rename(old_file, new_file)
            print(f'Renamed: "{filename}" to "{new_name}"')

print("Renaming complete!")
