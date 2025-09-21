import tensorflow as tf
import joblib
import numpy as np

# Load model & label encoder
model = tf.keras.models.load_model("dataset_n_model/health_model.keras")
label_encoder = joblib.load("dataset_n_model/label_encoder.pkl")

def predict_disease(symptom_text: str, threshold: float = 0.25):
    text = tf.constant([symptom_text])
    pred = model.predict([text])
    pred_prob = np.max(pred)  # highest probability
    pred_class = pred.argmax(axis=1)[0]
    disease = label_encoder.inverse_transform([pred_class])[0]
    if pred_prob >= threshold:
        return {
            "disease": disease,
            "confidence": float(pred_prob)
        }
    else:
        n=input("Sorry, i am unable to predict your disease by given symptoms... Tell me other symptoms you are having:\n")
        print(pred_prob)
        if n.strip() == ("no" or "nah"):
            return "Sorry for inconvenience, but we can help with something else"
        else:
            return predict_disease(symptom_text+","+n)