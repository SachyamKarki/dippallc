import os
from PIL import Image, ImageDraw

def remove_background(input_path, output_path):
    print(f"Processing {input_path} with edge-based flood fill...")
    
    # Load the image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Threshold for color similarity - slightly higher for robustness
    threshold = 45
    
    # Create a copy to work on
    flood_img = img.copy()
    
    # Replace background with a very specific unique color (e.g., magenta)
    unique_bg_color = (255, 0, 255, 255)
    
    # Collect points along the edges
    edge_points = []
    # Top and bottom edges (every 50 pixels)
    for x in range(0, width, 50):
        edge_points.append((x, 0))
        edge_points.append((x, height - 1))
    # Left and right edges (every 50 pixels)
    for y in range(0, height, 50):
        edge_points.append((0, y))
        edge_points.append((width - 1, y))
        
    for point in edge_points:
        try:
            # Check if the pixel at the edge is light/greyish (checkerboard colors)
            pixel = img.getpixel(point)
            # Checkerboard is often (204, 204, 204) or similar
            # or (255, 255, 255)
            if all(c > 180 for c in pixel[:3]):
                ImageDraw.floodfill(flood_img, point, unique_bg_color, thresh=threshold)
        except Exception:
            pass

    # Now convert pixels that match unique_bg_color to transparent
    datas = flood_img.getdata()
    new_data = []
    for item in datas:
        if item == unique_bg_color:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Save the result
    img.save(output_path, "PNG")
    print(f"Saved edge-refined image to {output_path}")

if __name__ == "__main__":
    input_file = "/Users/shakshamkarki/Desktop/dippa/public/images/hero-person.png"
    output_file = "/Users/shakshamkarki/Desktop/dippa/public/images/hero-person.png"
    
    if os.path.exists(input_file):
        remove_background(input_file, output_file)
    else:
        print(f"Error: {input_file} not found.")
