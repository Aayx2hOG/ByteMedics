# fastapi_health_bot.py
from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
import pickle
import hello

# -------------------------------
# Load Model, Tokenizer, Encoder
# -------------------------------
model = tf.keras.models.load_model("health_llm.keras")
tokenizer = pickle.load(open("tokenizer_llm.pkl", "rb"))
label_encoder = pickle.load(open("label_encoder_llm.pkl", "rb"))

# -------------------------------
# Prediction function
# -------------------------------
def predict_sol(text: str):
    seq = tokenizer.texts_to_sequences([text])
    padded = tf.keras.preprocessing.sequence.pad_sequences(seq, padding="post", maxlen=20)
    pred = model.predict(padded)
    label_idx = pred.argmax(axis=1)[0]
    return label_encoder.inverse_transform([label_idx])[0]

# -------------------------------
# FastAPI setup
# -------------------------------
app = FastAPI(title="Health LLM Bot")

# Request body schema
class InputText(BaseModel):
    text: str

# Home route
@app.get("/")
def home():
    return {"message": "Health LLM Bot is running. Use /predict endpoint to get predictions."}

# Prediction endpoint
@app.post("/predict")
def predict(input: InputText):
    user_text = input.text.strip()
    
    # Get predicted disease/label
    predicted_label = predict_sol(user_text).strip()
    
    # Run your hello.find_out() function
    response = hello.find_out(predicted_label, user_text)
    
    return {
        "predicted_label": predicted_label,
        "response": response
    }
