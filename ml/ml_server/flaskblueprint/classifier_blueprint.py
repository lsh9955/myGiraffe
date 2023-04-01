# classifier_blueprint.py
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import io
from flask import Blueprint, request, Response
import base64
import json

classifier_blueprint = Blueprint('classifier', __name__, url_prefix='/api')

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# 모델 불러오기
model = load_model("models/keras_model.h5", compile=False)

# 모델을 학습 시킬 때 넣었던 데이터 라벨 불러오기 (이거 수정하면 라벨이 바뀝니다)
class_names = open("models/labels.txt", "r", encoding="utf-8").readlines()

# Keras에 맞추기 위해서 depth를 가진 array 형식으로 짜줍니다.
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)


@classifier_blueprint.route('/classifier', methods=['GET', 'POST'])
def classifier():
    # GET 요청 들어오면 400 으로 반환 해주기
    if request.method == 'GET':
        datas = {'label': 'null',
                 'msg': 'Base64로 인코딩된 낙서 데이터를 POST 해주셔야 합니다.'}
        json_data = json.dumps(datas)
        response = Response(json_data, status=400, mimetype='application/json')
        return response
    print("=====POST Done=====")

    # 들어온 Base64 코드를 잘라서 반영 해주기
    image_data = base64.b64decode(request.json['base64_drawing'][22:])

    # 배경을 하얀색으로 바꿔주기. 그냥 RGB로 바꿔버리면 검정색으로 바뀜.
    # image = Image.open(io.BytesIO(image_data)).convert('RGB')
    image_rgba = Image.open(io.BytesIO(image_data)).convert('RGBA')
    image_rgb = Image.new("RGB", image_rgba.size, (255, 255, 255))
    image_rgb.paste(image_rgba, mask=image_rgba.split()[3])
    image = image_rgb

    # [디버깅 용] original 이미지 저장
    # save_path = os.path.join(os.getcwd(), 'resized_images')
    # image.save(os.path.join(save_path, 'original_image.jpg'))

    # 224, 224 의 학습 데이터에 맞춰 리사이징.
    # 센터에 맞춰서 자르기
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    # [디버깅 용] 리사이즈 이미지 저장 코드
    # image.save(os.path.join(save_path, 'resized_image.jpg'))

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
    printing_text = f'{round(max(prediction[0])*100)}% 확률로 {class_name[2:-1]}입니다.'

    # 반환용 JSON 형식으로 구조 짜기
    datas = {'label': str(class_name[2:-1]),
             'msg': printing_text}
    json_data = json.dumps(datas)
    response = Response(json_data, status=200, mimetype='application/json')
    return response
