from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import pickle
import joblib
import os
from typing import Dict, Any
import sys

# Add the bot directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'bot'))

# Import our bot modules
import hello
from bot_2 import predict_disease
from basic_bot import predict_sol

app = FastAPI(title="ByteMedics AI Service", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class HealthQuery(BaseModel):
    text: str

class IntentResponse(BaseModel):
    intent: str
    response: str
    confidence: float = 0.0

class DiseaseResponse(BaseModel):
    disease: str
    symptoms: str

class HealthResponse(BaseModel):
    intent: str
    response: str
    disease: str = None
    confidence: float = 0.0

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "OK", "service": "ByteMedics AI Service"}

# Predict intent from user message
@app.post("/api/v1/ai/predict-intent", response_model=IntentResponse)
async def predict_intent(query: HealthQuery):
    try:
        intent = predict_sol(query.text)
        response = hello.find_out(intent, query.text)
        
        return IntentResponse(
            intent=intent,
            response=response,
            confidence=0.95  # You can enhance this with actual confidence scores
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error predicting intent: {str(e)}")

# Predict disease from symptoms
@app.post("/api/v1/ai/predict-disease", response_model=DiseaseResponse)
async def predict_disease_endpoint(query: HealthQuery):
    try:
        disease = predict_disease(query.text)
        
        return DiseaseResponse(
            disease=disease,
            symptoms=query.text
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error predicting disease: {str(e)}")

# Combined health assistant endpoint
@app.post("/api/v1/ai/health-assistant", response_model=HealthResponse)
async def health_assistant(query: HealthQuery):
    try:
        # First predict the intent
        intent = predict_sol(query.text)
        
        # Get the appropriate response
        response = hello.find_out(intent, query.text)
        
        # If it's a symptom-related query, also get disease prediction
        disease = None
        if intent == "give_symptom":
            disease = predict_disease(query.text)
        
        return HealthResponse(
            intent=intent,
            response=response,
            disease=disease,
            confidence=0.55
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing health query: {str(e)}")

# Get available intents
@app.get("/api/v1/ai/intents")
async def get_intents():
    return {
        "intents": [
            {"name": "greet", "description": "Greeting messages"},
            {"name": "ask_symptom", "description": "Asking about symptoms"},
            {"name": "give_symptom", "description": "Providing symptoms for diagnosis"},
            {"name": "emergency", "description": "Emergency situations"},
            {"name": "thanks", "description": "Thank you messages"},
            {"name": "gibberish", "description": "Unclear or unrelated messages"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)