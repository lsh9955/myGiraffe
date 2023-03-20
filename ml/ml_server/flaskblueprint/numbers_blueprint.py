from flask import Blueprint

# Blueprint 객체를 생성합니다.
numbers_blueprint = Blueprint('numbers', __name__)


@numbers_blueprint.route('/api/numbers', methods=['GET'])
def numbers():
    return 'Hello, numbers!'