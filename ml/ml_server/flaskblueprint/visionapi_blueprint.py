from flask import Blueprint, request
import os
import json
from PIL import Image
import io
from dotenv import load_dotenv
import base64
from google.cloud import vision
from google.oauth2 import service_account

visionapi_blueprint = Blueprint('visionapi', __name__, url_prefix='/api')

# 환경 변수 로드
load_dotenv()

# 환경 변수 사용
vision_api_key = os.environ.get("vision_api_key")

# JSON 문자열을 파이썬 딕셔너리로 변환
vision_api_key = json.loads(vision_api_key)

# 서비스 계정 키 파일 경로 지정
# key_path = "./local.properties.txt"
# credentials = service_account.Credentials.from_service_account_file(key_path)
credentials = service_account.Credentials.from_service_account_info(vision_api_key)


# app.py가 있는 폴더 경로
app_dir = os.path.dirname(os.path.abspath(__file__))

# txt 파일 경로
txt_path = os.path.join(app_dir, '', 'empty_image.txt')

# txt 파일에서 문자열 읽어오기
with open(txt_path, 'r') as f:
    txt_str = f.read().strip()

# 이미지 분석 엔드포인트
@visionapi_blueprint.route('/visionapi', methods=['POST', 'GET'])
def visionapi():
    if request.method == 'GET':
        return "POST로 요청해주셔야 합니다."
    elif request.json['base64_drawing'] == "null" or request.json['base64_drawing'] == txt_str:
        return "null"
    print("=====POST Done=====")

    # vision client 선언!
    client = vision.ImageAnnotatorClient(credentials=credentials)
    print("=====Client Done=====")

    # 판단 기준을 받고, 그 기준들을 대표하는 속성 한가지를 픽해줍니다.
    index_1 = request.json['criteria_1'].split(',')[0]
    criteria_1 = set(map(lambda x: x.strip(), request.json['criteria_1'].split(',')))
    index_2 = request.json['criteria_2'].split(',')[0]
    criteria_2 = set(map(lambda x: x.strip(), request.json['criteria_2'].split(',')))

    print(criteria_1)
    print(criteria_2)

    # Base64로 디코딩 해줍니다. 앞의 부분은 자르고 뒤의 코드만 가져옵니다.
    try:
        decoded_image = base64.b64decode(request.json['base64_drawing'][22:])
    except base64.binascii.Error:
        return "옳지 않은 Base_64 인코딩 입니다. 올바른 코드를 입력해 주세요."

    # PNG 이미지를 JPEG 이미지로 변환
    image_rgba = Image.open(io.BytesIO(decoded_image)).convert('RGBA')
    image_rgb = Image.new("RGB", image_rgba.size, (255, 255, 255))
    image_rgb.paste(image_rgba, mask=image_rgba.split()[3])
    
    # [디버깅 용] 분석용 이미지 로컬에 파일로 저장하기
    image_rgb.save("./resized_images/vision_image.jpeg", format="JPEG")

    # 이미지 분석을 위해 vision.Image 객체 생성
    buffered = io.BytesIO()
    image_rgb.save(buffered, format="JPEG")
    image_content = buffered.getvalue()
    image = vision.Image(content=image_content)

    # =========== Web detection 용 코드 =============#
    response = client.web_detection(image=image)

    # Web_detection으로 태깅 데이터를 받아옵니다.
    annotations = response.web_detection

    # web_entities에서 description 추출
    descriptions = [entity.description for entity in annotations.web_entities]

    # # best_guess_labels의 label 추출 및 리스트 맨 앞에 추가
    # best_guess_label = annotations.best_guess_labels[0].label
    # descriptions.insert(0, best_guess_label)

    # descriptions 리스트 출력
    print("이게 디스크립션", descriptions)

    # # ============= 라벨 태깅용 코드 ================#
    response_label = client.label_detection(image=image, max_results=30)
    # print("=====response Done=====")

    answer = "none"
    labels = response_label.label_annotations

    # 아까 챙겨왔던 descriptions의 값을 기본 값으로 가져갑니다.
    tmp_label = set(descriptions)

    for label in labels:
        tmp_label.add(label.description)

    print("태그 일괄 조회: ", tmp_label)

    if criteria_1 & tmp_label:
        # answer = list(criteria_1 & tmp_label)[0]
        answer = index_1
    elif criteria_2 & tmp_label:
        # answer = list(criteria_2 & tmp_label)[0]
        answer = index_2

    # label 용 return 값
    return answer