from flask import Flask, request, jsonify
from inference import inference
from flask_cors import CORS
import os
import torch
from werkzeug.utils import secure_filename
import base64

from config import config
from model import SimpleCNN

# Initialize the Flask App
app = Flask(__name__)
CORS(app)

# Load the model 
path = 'checkpoints/epoch-23-valid_loss-6.09.pth'
# path = "/home/norakami/Age_estimation_Web/backend/checkpoints/epoch-23-valid_loss-6.09.pth"
model = SimpleCNN(input_dim=3, output_nodes=1, model_name="simple_cnn").to(config["device"])
# load best model from the latest checkpoint
latest_checkpoint = torch.load(path, map_location=config["device"])
model.load_state_dict(latest_checkpoint["model_state_dict"])

# Define a route for the root URL
@app.route('/')
def home():
    return "Welcome to the Age Estimation API!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file provided'}), 400

    # for inference one image at a time

    # Ensure the directory exists
    if not os.path.exists(config["image_path"]):
        os.makedirs(config["image_path"])

    # save the uploaded file 
    filename = secure_filename(file.filename)
    img_path = os.path.join(config["image_path"] + filename)

    file.save(img_path)

    # Save the image to a temporary file
    out_path = os.path.join(config["image_path"] + "output_image.jpg")

    try:
        age_str= inference(model, img_path, out_path)
        with open(out_path, "rb") as img_file:
            img_byte = base64.b64encode(img_file.read()).decode('utf-8')

        # Remove temporary files
        os.remove(img_path)
        os.remove(out_path)

        return jsonify({'message': 'Inference completed', 'image': f'data:image/jpeg;base64,{img_byte}', 'age': f'{age_str} years'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

