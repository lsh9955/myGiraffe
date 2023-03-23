# flaskblueprints/__init__.py
# Flask에 사용되는 Blue prints 들을 모아서 패키징 해줄 init.py 입니다.

# from flask import Blueprint

from .aivoice_blueprint import aivoice_blueprint
from .classifier_blueprint import classifier_blueprint
from .numbers_blueprint import numbers_blueprint
from .visionapi_blueprint import visionapi_blueprint
from .webdetection_blueprint import webdetection_blueprint


# Flask 애플리케이션에서 사용할 Blueprint 객체를 생성합니다.
app_blueprint = [
    aivoice_blueprint,
    classifier_blueprint,
    numbers_blueprint,
    visionapi_blueprint,
    webdetection_blueprint
]