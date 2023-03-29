# app.py
from flask import request, Flask
import os
import json
from dotenv import load_dotenv
import base64
from google.cloud import vision
from google.oauth2 import service_account
from flask_cors import CORS

# Flask app 임을 선언 합니다.
app = Flask(__name__)
CORS(app)

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

digit_dict = {'o': '0', 'O': 'ㅇ', 'p': '9', 'q': '9', }


@app.route('/api/numbers', methods=['GET', 'POST'])
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
    # print(response)

    origin_text = str(response.full_text_annotation.text).replace('\n', '')
    origin_count = len(origin_text)
    print(origin_text, ": length = ", origin_count)

    calcul_flag = False
    digit = ''
    for checking in range(len(origin_text)):
        if origin_text[checking].isnumeric():
            digit += origin_text[checking]
        else:
            if origin_text[checking] in ["+", "-", "*", "/"]:
                digit += origin_text[checking]
                calcul_flag = True
            elif origin_text[checking] in digit_dict.keys():
                digit += digit_dict[origin_text[checking]]

    if calcul_flag:
        digit = str(eval(digit))

    # digit = ''.join(re.findall(r'\d', response.full_text_annotation.text))
    if digit == "":
        digit = "죄송하지만 제대로 인식하지 못했어요... 다시 입력해주세요."
    return digit


# 이미지 분석 엔드포인트
@app.route('/api/visionapi', methods=['POST', 'GET'])
def visionapi():
    if request.method == 'GET':
        return "Base64로 인코딩된 사진 데이터를 첨부해주셔야 합니다."
    print("=====POST Done=====")

    # vision client 선언!
    client = vision.ImageAnnotatorClient(credentials=credentials)
    print("=====Client Done=====")

    # POST로 받는 데이터가 이미 BASE64 로 인코딩된 이미지이므로
    # Base64로 디코딩 해줍니다.
    criteria_1 = request.json['criteria_1']
    criteria_2 = request.json['criteria_2']

    try:
        image = vision.Image(content=base64.b64decode(request.json['base64_drawing']))
    except base64.binascii.Error:
        return "옳지 않은 Base_64 인코딩 입니다. 올바른 코드를 입력해 주세요."



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

    answer = "3"
    labels = response_label.label_annotations
    print('Labels:')
    tmp_label = set()
    for label in labels:
        tmp_label.add(label.description)
        print(label.description)
    if criteria_1 in tmp_label:
        answer = "1"
    elif criteria_2 in tmp_label:
        answer = "2"

    # web용 retun 값
    # return {'descriptions': descriptions, 'Labels': labels}

    # label 용 return 값
    answer_list = ["0", criteria_1, criteria_2, "Not_matched"]
    answer += " : " + answer_list[int(answer)]
    if answer[0] == "3":
        answer += " " + str(list(tmp_label))
    return answer

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)