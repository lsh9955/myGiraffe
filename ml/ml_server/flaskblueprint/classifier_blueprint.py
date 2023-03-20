# classifier_blueprint.py
from flask import Blueprint

classifier_blueprint = Blueprint('classifier', __name__, url_prefix='/api')


@classifier_blueprint.route('/classifier', methods=['GET'])
def classifier():
    return 'Hello, classifier!'