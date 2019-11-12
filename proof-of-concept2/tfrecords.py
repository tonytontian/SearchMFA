import tensorflow as tf
import json
import io
from object_detection.utils import dataset_util
from PIL import Image
from pathlib import Path
import tqdm
from sklearn.model_selection import train_test_split

JSON_PATH = '../analysis1/annotation/crop.json'
IMAGE_PATH = Path('../analysis1/dataset/images')

RESIZE = (300, 300)

OUTPUT_DIR = Path('tfrecords')
TRAIN_OUTPUT_PATH = str(OUTPUT_DIR / 'train_300x300.tfrecord')
TEST_OUTPUT_PATH  = str(OUTPUT_DIR / 'test_300x300.tfrecord')

def example_info(example):
    filename = example['filename']
    crop = example['l2']
    #
    filepath = IMAGE_PATH / filename
    ori_image = Image.open(filepath)
    image = ori_image.resize(RESIZE)
    #
    with io.BytesIO() as tmp_io:
        image.save(tmp_io, format='JPEG')
        tmp_io.seek(0)
        encoded_image_data = tmp_io.read()

    # with open(filepath, 'rb') as f:
    #     encoded_image_data = f.read()
    # with io.BytesIO(encoded_image_data) as f:
    #     image = Image.open(f)
    #
    width, height = image.size
    xmin = crop['x'] / 100
    ymin = crop['y'] / 100
    xmax = xmin + crop['width']/100
    ymax = ymin + crop['height']/100
    #
    xmins = [xmin]
    ymins = [ymin]
    xmaxs = [xmax]
    ymaxs = [ymax]
    #
    image_format = b'jpg'
    classes_text = [b'paint']
    classes = [1]

    return height, width, filename, encoded_image_data, image_format, xmins, xmaxs, ymins, ymaxs, classes_text, classes


def create_tf_example(example):
    (height, width, filename, encoded_image_data, image_format, xmins, xmaxs, ymins, ymaxs, classes_text, classes
     ) = example_info(example)

    filename = bytes(filename, 'utf-8')

    tf_example = tf.train.Example(
        features=tf.train.Features(feature={
            'image/height': dataset_util.int64_feature(height),
            'image/width': dataset_util.int64_feature(width),
            'image/filename': dataset_util.bytes_feature(filename),
            'image/source_id': dataset_util.bytes_feature(filename),
            'image/encoded': dataset_util.bytes_feature(encoded_image_data),
            'image/format': dataset_util.bytes_feature(image_format),
            'image/object/bbox/xmin': dataset_util.float_list_feature(xmins),
            'image/object/bbox/xmax': dataset_util.float_list_feature(xmaxs),
            'image/object/bbox/ymin': dataset_util.float_list_feature(ymins),
            'image/object/bbox/ymax': dataset_util.float_list_feature(ymaxs),
            'image/object/class/text': dataset_util.bytes_list_feature(classes_text),
            'image/object/class/label': dataset_util.int64_list_feature(classes),
        })
    )

    return tf_example

def to_tfrecord(output_path, examples):
    with tf.io.TFRecordWriter(output_path) as writer:
        for example in tqdm.tqdm(examples):
            tf_example = create_tf_example(example)
            writer.write(tf_example.SerializeToString())

def main():
    with open(JSON_PATH) as f:
        examples = json.load(f)
    train, test = train_test_split(examples, random_state=5500)
    print(len(train), len(test))

    to_tfrecord(TRAIN_OUTPUT_PATH, train)
    to_tfrecord(TEST_OUTPUT_PATH, test)

if __name__ == '__main__':
    main()
