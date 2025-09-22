import bot_2
import ask_symptom
def find_out(intent : str,text:str):
    if intent == "greet":
        return "Hello! 👋 I’m your Health Assistant."

    elif intent == "ask_symptom":
        n = ask_symptom.get_symptoms(text)
        return n

    elif intent == "give_symptom":
        return bot_2.predict_disease(text)

    elif intent == "emergency":
        return "This sounds serious 🚨. Please call emergency services (e.g., 108 in India or 911 in the US) immediately or rush to the nearest hospital!"

    elif intent == "thanks":
        return "Goodbye! Take care of your health. 💙"

    elif intent == "gibberish":
        return "Sorry, I didn’t quite understand that. Could you rephrase it or ask me about your symptoms?"