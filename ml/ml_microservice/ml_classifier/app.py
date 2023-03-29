# app.py
from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
import io
from flask import Flask, request, jsonify
import base64
from flask_cors import CORS

# Flask app 임을 선언 합니다.
app = Flask(__name__)
CORS(app)

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = load_model("models/keras_model.h5", compile=False)

# Load the labels
class_names = open("models/labels.txt", "r", encoding="utf-8").readlines()

# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)


@app.route('/api/classifier', methods=['GET', 'POST'])
def classifier():
    if request.method == 'GET':
        return "Base64로 인코딩된 낙서 데이터를 첨부해주셔야 합니다."
    print("=====POST Done=====")

    # Replace this with the path to your image
    image_data = base64.b64decode(request.json['base64_drawing'])
    image = Image.open(io.BytesIO(image_data)).convert('RGB')

    # resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    # turn the image into a numpy array
    image_array = np.asarray(image)

    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    # Load the image into the array
    data[0] = normalized_image_array
    # data[0] = np.asarray(image)

    # Predicts the model
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    print(round(max(prediction[0])*100), "% 확률로", class_name[2:-1], "입니다.")
    return class_name[2:-1]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)