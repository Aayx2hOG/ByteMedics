import tensorflow as tf
import joblib

# Step 1: Load Model and Encoder
model = tf.keras.models.load_model("dataset_n_model/health_model.keras")
label_encoder = joblib.load("dataset_n_model/label_encoder.pkl")

# Step 2: Make Predictions
def predict_disease(symptom_text: str):
    text = tf.constant([symptom_text])
    pred = model.predict([text])
    pred_class = pred.argmax(axis=1)[0]
    disease = label_encoder.inverse_transform([pred_class])[0]
    return disease