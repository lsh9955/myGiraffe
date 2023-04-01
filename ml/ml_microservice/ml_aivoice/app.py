# app.py
from flask import Flask, Response, request
import io
from google.cloud import texttospeech
from google.oauth2 import service_account
import os
import json
from dotenv import load_dotenv
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

credentials = service_account.Credentials.from_service_account_info(vision_api_key)


@app.route('/api/aivoice', methods=['POST', 'GET'])
def aivoice():
    # POST로 전달된 텍스트를 가져옵니다.
    if request.method == 'POST':
        # POST로 전달된 텍스트를 가져옵니다.
        text = request.json['text']
    elif request.method == 'GET' or request.json['text'] == "":
        # GET으로 전달된 텍스트를 가져옵니다.
        text = "제가 말할 수 있는 대사가 없어요."

    # TTS 작업 수행
    client = texttospeech.TextToSpeechClient(credentials=credentials)
    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="ko-KR",
        name="ko-KR-Wavenet-B",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.85,
    )

    response = client.synthesize_speech(
        request={"input": input_text, "voice": voice, "audio_config": audio_config}
    )

    # Response 객체를 생성하여 파일 데이터를 전송합니다.
    mp3_data = io.BytesIO()
    mp3_data.write(response.audio_content)
    mp3_data.seek(0)

    return Response(mp3_data, mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)