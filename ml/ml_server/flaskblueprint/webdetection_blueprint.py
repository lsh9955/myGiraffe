from flask import Blueprint

# Blueprint 객체를 생성합니다.
webdetection_blueprint = Blueprint('webdetection', __name__)


@webdetection_blueprint.route('/api/webdetection', methods=['GET'])
def webdetection():
    return 'Hello, webdetectio!'