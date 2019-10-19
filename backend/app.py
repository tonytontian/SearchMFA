import os, io
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from pathlib import Path
from PIL import Image
from bitarray import bitarray

from init import init

# parameters
STORAGE=Path('storage')
HASH = 'dhash'

# flask config
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# init
records, hashes, hash_func = init(STORAGE, HASH)

# upload
@app.route('/upload', methods=['POST'])
@cross_origin(origin='*')
def upload_file():
    file = request.files.get('file')
    image = Image.open(io.BytesIO(file.read()))
    hash_str = ''.join(map(str, hash_func(image).hash.flatten().astype(int)))
    bita = bitarray(hash_str)
    # get most similar image
    hamming_dist = [(bita ^ bitb).count(1) for bitb in hashes]
    
    return ''

app.run(debug=True)
