from flask import Blueprint, request
import os
import re
import json
from dotenv import load_dotenv
import base64
from google.cloud import vision
from google.oauth2 import service_account


# Blueprint 객체를 생성합니다.
numbers_blueprint = Blueprint('numbers', __name__)

# 환경 변수 로드
load_dotenv()

# 환경 변수 사용
vision_api_key = os.environ.get("vision_api_key")

# JSON 문자열을 파이썬 딕셔너리로 변환
vision_api_key = json.loads(vision_api_key)

# 서비스 계정 키 파일 경로 지정
credentials = service_account.Credentials.from_service_account_info(vision_api_key)

@numbers_blueprint.route('/api/numbers', methods=['POST', 'GET'])
def numbers():
    if request.method == 'GET':
        return "Base64로 인코딩된 필기 데이터를 첨부해주셔야 합니다."
    print("=====POST Done=====")

    # vision client 선언!
    client = vision.ImageAnnotatorClient(credentials=credentials)
    print("=====Client Done=====")

    # POST로 받는 데이터가 이미 BASE64 로 인코딩된 이미지이므로
    # Base64로 디코딩 해줍니다.
    image = vision.Image(content=base64.b64decode(request.json['base64_drawing']))

    # 자, 그러면 이제 한국어로만 인식해보도록 하죠.
    image_context = vision.ImageContext(language_hints=["ko"])

    response = client.document_text_detection(image=image, image_context=image_context)
    print("=====response Done=====")
    print(response)
    print(response.full_text_annotation.text)
    origin_count = len(response.full_text_annotation.text)
    digit = ''.join(re.findall(r'\d', response.full_text_annotation.text))
    if digit == "":
        digit = "죄송하지만 제대로 인식하지 못했어요... 다시 입력해주세요."
    elif len(digit) != origin_count:
        return (f'일부만 인식했습니다. 인식한 숫자는 [ ' + digit + ' ] 입니다.')
    return digit