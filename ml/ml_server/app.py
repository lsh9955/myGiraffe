from flask import Flask
from flask import Blueprint
from flaskblueprint import app_blueprint


# Flask app 임을 선언 합니다.
app = Flask(__name__)

# Blueprint 모듈을 등록합니다.
for blueprint in app_blueprint:
    app.register_blueprint(blueprint)

apitest_blueprint = Blueprint('apitest', __name__)

# Flask 는 app.py 하나로 백엔드 구축이 가능한 가벼움을 가졌습니다.
# 그렇기에, 이 app.py를 기반으로 Flask를 구축하여 각 서비스를 분절하여 제공하겠습니다.


# 데코레이터의 route는
# "해당 함수를 받기 위한 주소: ex. /api/v1/service" 와
# "해당 함수를 호출하기 위한 방식:methods"을 보여줍니다.
@app.route('/', methods=['GET'])
# 함수 이름을 배정해줍니다.
def main():
    # 여기가 함수 본문입니다.
    # 여기에 로직이 들어갑니다만, main은 예시 파일이므로 텍스트만 출력해줍니다.
    tmp_text = 'Hello, World! Here is Flask main page.' \
               '<br> Please input right endpoint at the end of the URL address.' \
               '<br> This is ML start page. 내가 기린 그림 화이팅!' \
               '<br> 만약 다른곳으로 가고 싶으면? ' \
               '<a href="https://www.notion.so/API-07f34d5001a2472c85d6e2d21cc13bc8?pvs=4#88a2c7663ffc4a70a060b0b57c206a69">api 문서</a>'
    return tmp_text


@app.route('/api', methods=['GET'])
# 함수 이름을 배정해줍니다.
def apiservice():
    # 여기가 함수 본문입니다.
    # 여기에 로직이 들어갑니다만, api service를 나열해줍시다.
    tmp_text = 'Hello, World! Here is Flask main page.' \
               '<br>Please input right endpoint at the end of the URL address.' \
               '<br> 주소창 뒤에 aivoice를 붙이면 나래이션 쪽으로 갑니당.'\
               '<br> 주소창 뒤에 classifier를 붙이면 그림 분류기로 갑니당' \
               '<br> 주소창 뒤에 numbers를 붙이면 숫자 필기 인식기로 갑니당' \
               '<br> 주소창 뒤에 visionapi를 붙이면 그림 속성 인식기로 갑니당' \
               '<br> 주소창 뒤에 webdetecion을 붙이면 그림 속성 인식기로 갑니당' \
               '<br>This is ML start page. 내가 기린 그림 화이팅! ' \
               '<a href="https://www.notion.so/API-07f34d5001a2472c85d6e2d21cc13bc8?pvs=4#88a2c7663ffc4a70a060b0b57c206a69">api 문서</a>'
    return tmp_text


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

