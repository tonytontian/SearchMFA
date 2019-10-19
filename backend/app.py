import os, io
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from pathlib import Path
from PIL import Image

UPLOAD_FOLDER = './images'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['POST'])
@cross_origin(origin='*')
def upload_file():
    file = request.files.get('file')
    image = Image.open(io.BytesIO(file.read()))
    
    return ''

app.run(debug=True)
