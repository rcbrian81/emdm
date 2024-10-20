import os
from PIL import Image

def convert_images_to_webp(input_folder, output_folder):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith(".jpg"):  # Check for .jpg files
            img_path = os.path.join(input_folder, filename)
            img = Image.open(img_path)
            
            # Convert image to .webp format
            output_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(output_folder, output_filename)
            
            # Save the image as .webp
            img.save(output_path, "webp")
            print(f"Converted {filename} to {output_filename}")

# Example usage:
input_folder = "public/images/jpg/"  # Replace with your input folder path
output_folder = "public/images/webp/"  # Replace with your output folder path

convert_images_to_webp(input_folder, output_folder)
