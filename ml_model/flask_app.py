from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load the trained model
model = load_model("cattle_disease_model.h5")  # Ensure the .h5 file is in the same folder

# Map diseases to their remedies
disease_map = {
    0: {"name": "Anthrax disease", "remedy": "Use deep burial or burning of infected carcasses to prevent contamination.Improve pasture drainage to reduce spore survival.Use herbal immune boosters like garlic or turmeric in feed(ಮಾಲಿನ್ಯವನ್ನು ತಡೆಗಟ್ಟಲು ಸೋಂಕಿತ ಶವಗಳ ಆಳವಾದ ಸಮಾಧಿ ಅಥವಾ ಸುಡುವಿಕೆಯನ್ನು ಬಳಸಿ. ಬೀಜಕಗಳ ಬದುಕುಳಿಯುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಹುಲ್ಲುಗಾವಲು ಒಳಚರಂಡಿಯನ್ನು ಸುಧಾರಿಸಿ. ಆಹಾರದಲ್ಲಿ ಬೆಳ್ಳುಳ್ಳಿ ಅಥವಾ ಅರಿಶಿನದಂತಹ ಗಿಡಮೂಲಿಕೆಗಳ ಪ್ರತಿರಕ್ಷಣಾ ವರ್ಧಕಗಳನ್ನು ಬಳಸಿ)"},
    1: {"name": "Black leg disease", "remedy": "Feed immune-boosting herbs like neem and tulsi.Apply warm compresses to swollen areas to reduce inflammation.Ensure cattlegraze in dry,uncontaminated pastures..(ಬೇವು ಮತ್ತು ತುಳಸಿಯಂತಹ ರೋಗನಿರೋಧಕ-ಉತ್ತೇಜಿಸುವ ಗಿಡಮೂಲಿಕೆಗಳನ್ನು ತಿನ್ನಿಸಿ. ಉರಿಯೂತವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಊದಿಕೊಂಡ ಪ್ರದೇಶಗಳಿಗೆ ಬೆಚ್ಚಗಿನ ಸಂಕುಚಿತತೆಯನ್ನು ಅನ್ವಯಿಸಿ. ಒಣ, ಕಲುಷಿತವಲ್ಲದ ಹುಲ್ಲುಗಾವಲುಗಳಲ್ಲಿ ಜಾನುವಾರುಗಳನ್ನು ಮೇಯಿಸುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ)"},
    2: {"name": "Foot and mouth disease", "remedy": "Apply turmeric paste mixed with neem oil to ulcers for healing.Provide soft and easily digestible feed to reduce pain during eating.Disinfect the environment with lime powder to prevent further spread.(ವಾಸಿಯಾಗಲು ಹುಣ್ಣುಗಳಿಗೆ ಬೇವಿನ ಎಣ್ಣೆಯನ್ನು ಬೆರೆಸಿದ ಅರಿಶಿನ ಪೇಸ್ಟ್ ಅನ್ನು ಅನ್ವಯಿಸಿ. ತಿನ್ನುವಾಗ ನೋವು ಕಡಿಮೆ ಮಾಡಲು ಮೃದುವಾದ ಮತ್ತು ಸುಲಭವಾಗಿ ಜೀರ್ಣವಾಗುವ ಆಹಾರವನ್ನು ಒದಗಿಸಿ. ಮತ್ತಷ್ಟು ಹರಡುವುದನ್ನು ತಡೆಯಲು ಸುಣ್ಣದ ಪುಡಿಯಿಂದ ಪರಿಸರವನ್ನು ಸೋಂಕುರಹಿತಗೊಳಿಸಿ)"},
    3: {"name": "Healthy", "remedy": "No Action Needed (ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ)"},
    4: {"name": "Johnes disease", "remedy": "Add probiotics (e.g., curd or yogurt) to feed to restore gut health.Feed high-fiber diets, including green grass and hay, to reduce symptoms.Use herbal supplements like aloe vera juice to soothe the digestive tract.(ಕರುಳಿನ ಆರೋಗ್ಯವನ್ನು ಪುನಃಸ್ಥಾಪಿಸಲು ಆಹಾರಕ್ಕಾಗಿ ಪ್ರೋಬಯಾಟಿಕ್‌ಗಳನ್ನು (ಉದಾ. ಮೊಸರು ಅಥವಾ ಮೊಸರು) ಸೇರಿಸಿ. ರೋಗಲಕ್ಷಣಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಹಸಿರು ಹುಲ್ಲು ಮತ್ತು ಹುಲ್ಲು ಸೇರಿದಂತೆ ಹೆಚ್ಚಿನ ಫೈಬರ್ ಆಹಾರವನ್ನು ನೀಡಿ. ಜೀರ್ಣಾಂಗವನ್ನು ಶಮನಗೊಳಿಸಲು ಅಲೋವೆರಾ ರಸದಂತಹ ಗಿಡಮೂಲಿಕೆಗಳ ಪೂರಕಗಳನ್ನು ಬಳಸಿ.)."},
    5: {"name": "Lumpy skin disease", "remedy": "Apply neem leaf paste to the nodules to soothe and disinfect.Use turmeric and honey mixture to boost immunity.Bathe cattle with a solution of neem leaves to reduce skin irritation(ಶಮನಗೊಳಿಸಲು ಮತ್ತು ಸೋಂಕು ನಿವಾರಣೆಗೆ ಗಂಟುಗಳಿಗೆ ಬೇವಿನ ಎಲೆಯ ಪೇಸ್ಟ್ ಅನ್ನು ಅನ್ವಯಿಸಿ. ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಅರಿಶಿನ ಮತ್ತು ಜೇನುತುಪ್ಪದ ಮಿಶ್ರಣವನ್ನು ಬಳಸಿ. ಚರ್ಮದ ಕಿರಿಕಿರಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೇವಿನ ಎಲೆಗಳ ದ್ರಾವಣದೊಂದಿಗೆ ಜಾನುವಾರುಗಳನ್ನು ಸ್ನಾನ ಮಾಡಿ.)."},
    6: {"name": "Mastitis", "remedy": "Massage the udder with warm coconut oil infused with neem leaves.Apply a paste of turmeric and mustard oil to the affected area for antibacterial effects.Feed garlic or fenugreek seeds to enhance immunity.(ಬೇವಿನ ಎಲೆಗಳನ್ನು ಬೆರೆಸಿದ ಬೆಚ್ಚಗಿನ ತೆಂಗಿನ ಎಣ್ಣೆಯಿಂದ ಕೆಚ್ಚಲು ಮಸಾಜ್ ಮಾಡಿ. ಬ್ಯಾಕ್ಟೀರಿಯಾ ವಿರೋಧಿ ಪರಿಣಾಮಗಳಿಗಾಗಿ ಅರಿಶಿನ ಮತ್ತು ಸಾಸಿವೆ ಎಣ್ಣೆಯ ಪೇಸ್ಟ್ ಅನ್ನು ಪೀಡಿತ ಪ್ರದೇಶಕ್ಕೆ ಅನ್ವಯಿಸಿ. ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಬೆಳ್ಳುಳ್ಳಿ ಅಥವಾ ಮೆಂತ್ಯ ಬೀಜಗಳನ್ನು ತಿನ್ನಿಸಿ.)"},
    7: {"name": "Rinderpest disease", "remedy": "Provide electrolyte solutions (salt and sugar in water) to combat dehydration.Add tulsi or holy basil to water for its antiviral properties.Ensure proper nutrition to boost immunity.(ನಿರ್ಜಲೀಕರಣವನ್ನು ಎದುರಿಸಲು ಎಲೆಕ್ಟ್ರೋಲೈಟ್ ದ್ರಾವಣಗಳನ್ನು (ನೀರಿನಲ್ಲಿ ಉಪ್ಪು ಮತ್ತು ಸಕ್ಕರೆ) ಒದಗಿಸಿ. ಅದರ ಆಂಟಿವೈರಲ್ ಗುಣಲಕ್ಷಣಗಳಿಗಾಗಿ ತುಳಸಿ ಅಥವಾ ಪವಿತ್ರ ತುಳಸಿಯನ್ನು ನೀರಿಗೆ ಸೇರಿಸಿ. ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಸರಿಯಾದ ಪೋಷಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ)"},
    8: {"name": "Swollen joints", "remedy": "Apply a paste of turmeric and castor oil to reduce inflammation.Provide warm herbal baths with neem and tulsi extracts.Feed anti-inflammatory herbs like ginger in small amounts.(ಉರಿಯೂತವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಅರಿಶಿನ ಮತ್ತು ಕ್ಯಾಸ್ಟರ್ ಆಯಿಲ್ನ ಪೇಸ್ಟ್ ಅನ್ನು ಅನ್ವಯಿಸಿ. ಬೇವು ಮತ್ತು ತುಳಸಿ ಸಾರಗಳೊಂದಿಗೆ ಬೆಚ್ಚಗಿನ ಗಿಡಮೂಲಿಕೆಗಳ ಸ್ನಾನವನ್ನು ಒದಗಿಸಿ. ಶುಂಠಿಯಂತಹ ಉರಿಯೂತದ ಗಿಡಮೂಲಿಕೆಗಳನ್ನು ಸಣ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ನೀಡಿ.)"},
    
    
    # Add more disease mappings as needed
}

@app.route("/predict", methods=["POST"])
def predict():
    # Check if an image is uploaded
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    # Save the uploaded image
    image_file = request.files["image"]
    image_path = "temp_image.jpg"
    image_file.save(image_path)

    # Preprocess the image
    img = load_img(image_path, target_size=(224, 224))  # Resize to match the model's input size
    img_array = img_to_array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Make prediction
    predictions = model.predict(img_array)
    disease_idx = np.argmax(predictions)  # Get the index of the highest confidence score
    confidence = float(np.max(predictions))  # Get the confidence score

    # Retrieve disease details
    disease_details = disease_map.get(disease_idx, {"name": "Unknown", "remedy": "Consult a veterinarian."})

    # Return the result
    return jsonify({
        "disease": disease_details["name"],
        "confidence": confidence,
        "remedy": disease_details["remedy"]
    })
# except Exception as e:
#         print(f"Error during prediction: {e}")
#         return jsonify({"error": "Failed to process the image. Please try again."}), 500

if __name__ == "__main__":
    app.run(port=5001)
