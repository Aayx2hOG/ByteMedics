import pandas as pd
from rapidfuzz import process

df = pd.read_csv("data_health.csv")
disease_to_symptoms = dict(zip(df["Disease_Name"].str.lower(), df["Symptoms"]))
disease_list = list(disease_to_symptoms.keys())

def get_symptoms(disease_input: str):
    user_text = disease_input.lower()
    best_match, score, _ = process.extractOne(user_text, disease_list)
    
    if score > 60: 
        symptoms = disease_to_symptoms[best_match].split(", ")
        return {
            "matched_disease": best_match.title(),
            "symptoms": symptoms,
            "match_score": round(score, 2)
        }
    
    return {
        "matched_disease": None,
        "symptoms": ["Sorry, I don't have information for that disease."],
        "match_score": round(score, 2)
    }