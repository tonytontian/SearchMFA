from flask import Flask, flash, request, send_from_directory
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)

CROP_FILE = 'crop.txt'

@app.route('/map', methods=['POST'])
@cross_origin(origin='*')
def get_map():
    with open('../annotation/true_map.csv') as f:
        data = f.read()
    data = data.split('\n')
    data = [row.split(',') for row in data]
    
    return json.dumps(data)

@app.route('/images/<img>')
@cross_origin(origin='*')
def send_image(img):
    return send_from_directory(
        '../dataset/images',
        img
    )

@app.route('/crop', methods=['POST'])
@cross_origin(origin='*')
def get_crop():
    form = request.form
    image = form.get('image')
    level1 = form.get('level1')
    level2 = form.get('level2')
    level3 = form.get('level3')

    with open(CROP_FILE, 'a') as f:
        f.write('{},{},{},{}\n'.format(
            image, level1, level2, level3
        ))
    print(image, level1, level2, level3)

    return ""

app.run(debug=True, host="0.0.0.0")
