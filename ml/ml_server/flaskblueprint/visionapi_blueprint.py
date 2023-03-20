from flask import Blueprint, request
import base64

# 예전 버전의 클라우드 비전용 import 코드입니다~
# from google.cloud import vision_v1
# from google.cloud.vision_v1.types import Image
from google.cloud import vision



visionapi_blueprint = Blueprint('visionapi', __name__, url_prefix='/api')


# Base64로 인코딩된 이미지 디코딩
def decode_base64(base64_drawing):
    # 'data:image/png;base64,iVBORw0KG...' 형식에서 'iVBORw0KG...' 부분 추출
    base64_str = base64_drawing.split(',')[1]
    # Base64 디코딩
    image_data = base64.b64decode(base64_str)
    return image_data


# 이미지 분석 함수
def analyze_image(image_data):
    # Google Cloud Vision API 인증 정보 로드
    client = vision.ImageAnnotatorClient()
    # Image 객체 생성
    image = vision.Image(content=image_data)
    # Vision API 요청
    response = client.web_detection(image=image)
    # 분석 결과 반환
    return response


# 이미지 분석 엔드포인트
@visionapi_blueprint.route('/visionapi', methods=['POST'])
def visionapi():
    # Base64 인코딩된 이미지 데이터 받기
    base64_drawing = request.json['base64_drawing']
    return base64_drawing
    # 이미지 데이터 디코딩
    image_data = decode_base64(base64_drawing)
    # 이미지 분석
    response = analyze_image(image_data)
    # 분석 결과 출력
    print(response)
    return 'Image analysis is complete.'