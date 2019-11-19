from pathlib import Path
from PIL import Image
import tqdm

image_dir = Path('dataset/testing dataset')
target_image_dir = Path('dataset/testing dataset small')
target_image_dir.mkdir(exist_ok=True)

image_paths = list(image_dir.glob(r'*.JPG'))

def resize_image(image_path):
    image = Image.open(image_path)
    w, h = image.size
    image_resized = image.resize((w//4, h//4))
    #
    new_path = target_image_dir / image_path.name
    image_resized.save(new_path)

for image_path in tqdm.tqdm(image_paths):
    resize_image(image_path)
