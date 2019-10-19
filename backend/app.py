import os, io
from flask import Flask, flash, request, redirect, url_for, send_from_directory
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from pathlib import Path
from PIL import Image
from bitarray import bitarray
import numpy as np
import json

from init import init

# parameters
STORAGE=Path('storage')
HASH = 'dHash'

# flask config
app = Flask(__name__, static_url_path='/storage/images')

# init
records, hashes, hash_func = init(STORAGE, HASH)

# upload
@app.route('/upload', methods=['POST'])
@cross_origin(origin='*')
def upload_file():
    # get image
    file = request.files.get('file')
    image = Image.open(io.BytesIO(file.read()))
    # calculate hash
    hash_str = ''.join(map(str, hash_func(image).hash.flatten().astype(int)))
    bita = bitarray(hash_str)
    # get most similar image
    hamming_dist = [(bita ^ bitb).count(1) for bitb in hashes]
    closest = np.argmin(hamming_dist)
    record = records[closest]
    # prepare return object
    res = json.dumps({
        'object_id': record['object_id'],
        'detail': record['detail']
    })
    
    return res

@app.route('/images/<object_id>')
def send_image(object_id):
    return send_from_directory('storage/images', '{}.jpg'.format(object_id))

app.run(debug=True)
