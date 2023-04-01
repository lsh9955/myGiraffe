# app.py
# from flask import Flask, jsonify, Blueprint, request, Response
import io
import os
import numpy as np
from flask import Flask, request
from flask_cors import CORS
from keras.models import load_model
from PIL import Image, ImageOps
import base64
# import json

# Flask app 임을 선언 합니다.
app = Flask(__name__)
CORS(app)

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = load_model("models/keras_model.h5", compile=False)

# Load the labels
class_names = open("models/labels.txt", "r", encoding="utf-8").readlines()

# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

# app.py가 있는 폴더 경로
app_dir = os.path.dirname(os.path.abspath(__file__))

# txt 파일 경로
txt_path = os.path.join(app_dir, '', 'empty_image.txt')

# txt 파일에서 문자열 읽어오기
with open(txt_path, 'r') as f:
    txt_str = f.read().strip()

@app.route('/api/classifier', methods=['GET', 'POST'])
def classifier():
    # GET 요청 들어오면 400 으로 반환 해주기
    if request.method == 'GET':
        # Json 형식으로 반환하는 양식: 파기
        # datas = {'label': 'null',
        #          'msg': 'Base64로 인코딩된 낙서 데이터를 POST 해주셔야 합니다.'}
        # json_data = json.dumps(datas)
        # response = Response(json_data, status=400, mimetype='application/json')
        # return response
        return 'POST 방식으로 요청해주세요!'

    # 빈캔버스나 Base64가 오지 않았을 경우.
    elif request.json['base64_drawing'] == "null" or request.json['base64_drawing'] == txt_str:
        return "null"

    print("=====POST Done=====")

    # 들어온 Base64 코드를 잘라서 반영 해주기
    image_data = base64.b64decode(request.json['base64_drawing'])

    # 배경을 하얀색으로 바꿔주기. 그냥 RGB로 바꿔버리면 검정색으로 바뀜.
    # image = Image.open(io.BytesIO(image_data)).convert('RGB')
    image_rgba = Image.open(io.BytesIO(image_data)).convert('RGBA')
    image_rgb = Image.new("RGB", image_rgba.size, (255, 255, 255))
    image_rgb.paste(image_rgba, mask=image_rgba.split()[3])
    image = image_rgb

    # [디버깅 용] original 이미지 저장
    save_path = os.path.join(os.getcwd())
    image.save(os.path.join(save_path, 'original_image.jpg'))

    # 224, 224 의 학습 데이터에 맞춰 리사이징.
    # 센터에 맞춰서 자르기
    size = (224, 224)
    image.thumbnail(size, Image.ANTIALIAS)
    image_size = image.size

    if image_size[0] != size[0] or image_size[1] != size[1]:
        thumb = image.crop((0, 0, size[0], size[1]))
        offset_x = max((size[0] - image_size[0]) / 2, 0)
        offset_y = max((size[1] - image_size[1]) / 2, 0)
        image = Image.new('RGBA', size, (255, 255, 255, 0))
        image.paste(thumb, (int(offset_x), int(offset_y)))

    # [디버깅 용] 리사이즈 이미지 저장 코드

    image.save(os.path.join(save_path, 'resized_image.jpg'))

    # 이미지를 Numpy 배열로 전환
    image_array = np.asarray(image)

    # 이미지를 일반화
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    # 이미지를 배열로 읽어오기
    data[0] = normalized_image_array
    # data[0] = np.asarray(image)

    # 예측 모델 실행
    prediction = model.predict(data)

    # 확률이 가장 높은 모델의 index -> 이름 도출
    index = np.argmax(prediction)
    class_name = class_names[index]
    print(f'{round(max(prediction[0]) * 100)}% 확률로 {class_name[2:-1]}입니다.')

    # 반환용 JSON 형식으로 구조 짜기
    # datas = {'label': str(class_name[2:-1]),
    #          'msg': printing_text}
    # json_data = json.dumps(datas)
    # response = Response(json_data, status=200, mimetype='application/json')
    return class_name[2:-1]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)