from flask import Blueprint, request
import os
import json
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

# 이미지 분석 엔드포인트
@visionapi_blueprint.route('/visionapi', methods=['POST', 'GET'])
def visionapi():
    if request.method == 'GET':
        return "Base64로 인코딩된 사진 데이터를 첨부해주셔야 합니다."
    print("=====POST Done=====")

    # vision client 선언!
    client = vision.ImageAnnotatorClient(credentials=credentials)
    print("=====Client Done=====")

    # POST로 받는 데이터가 이미 BASE64 로 인코딩된 이미지이므로
    # Base64로 디코딩 해줍니다.
    image = vision.Image(content=base64.b64decode(request.json['base64_drawing']))

    # =========== Web detection 용 코드 =============#
    # response = client.web_detection(image=image)
    #
    # # Web_detection으로 태깅 데이터를 받아옵니다.
    # annotations = response.web_detection
    # # 출력합니다.
    # print('Image analysis is complete.')
    #
    # # web_entities에서 description 추출
    # descriptions = [entity.description for entity in annotations.web_entities]
    #
    # # best_guess_labels의 label 추출 및 리스트 맨 앞에 추가
    # best_guess_label = annotations.best_guess_labels[0].label
    # descriptions.insert(0, best_guess_label)
    #
    # # descriptions 리스트 출력
    # print(descriptions)

    # ============= 라벨 태깅용 코드 ================#
    response_label = client.label_detection(image=image, max_results=30)
    print("=====response Done=====")

    labels = response_label.label_annotations
    print('Labels:')
    tmp_label = []
    for label in labels:
        tmp_label.append(label.description)
        print(label.description)

    # web용 retun 값
    # return {'descriptions': descriptions, 'Labels': labels}

    # label 용 return 값
    return tmp_label