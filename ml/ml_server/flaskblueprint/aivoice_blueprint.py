# 필요한 모듈을 import 합니다.
from flask import Blueprint, Response, request
import io
from google.cloud import texttospeech
from google.oauth2 import service_account
import os
import json
from dotenv import load_dotenv
import requests

# Blueprint 객체를 생성합니다.
aivoice_blueprint = Blueprint('aivoice_blueprint', __name__)

# 환경 변수 로드
load_dotenv()

# 환경 변수 사용
vision_api_key = os.environ.get("vision_api_key")

# JSON 문자열을 파이썬 딕셔너리로 변환
vision_api_key = json.loads(vision_api_key)

credentials = service_account.Credentials.from_service_account_info(vision_api_key)


@aivoice_blueprint.route('/api/aivoice', methods=['POST', 'GET'])
def aivoice():
    # POST로 전달된 텍스트를 가져옵니다.
    if request.method == 'POST':
        # POST로 전달된 텍스트를 가져옵니다.
        text = request.json['text']
    elif request.method == 'GET':
        # GET으로 전달된 텍스트를 가져옵니다.
        text = "조원희 원희조 팀장은 언제나 바보 바보 바보"

    # TTS 작업 수행
    client = texttospeech.TextToSpeechClient(credentials=credentials)
    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="ko-KR",
        name="ko-KR-Wavenet-D",
        ssml_gender=texttospeech.SsmlVoiceGender.MALE,
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