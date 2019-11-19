import cv2
from pathlib import Path

csv_file = 'annotation/true_map.csv'
with open(csv_file) as f:
    data = f.readlines()
data = [row.strip().split(',') for row in data]

image_dir = Path('dataset/testing dataset small')
# image_name = data[0][0]
for image_row in  data:
    image_name = image_row[0]
    image_path = image_dir / image_name

    image = cv2.imread(str(image_path))
    cv2.imshow(image_name, image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    cv2.waitKey(1)