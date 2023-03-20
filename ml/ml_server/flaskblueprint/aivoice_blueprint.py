# flaskblueprints/aivoice_blueprint.py

from flask import Blueprint

# Blueprint 객체를 생성합니다.
aivoice_blueprint = Blueprint('aivoice_blueprint', __name__)

@aivoice_blueprint.route('/api/aivoice', methods=['GET'])
def aivoice():
    return 'Hello, aivoice!'
