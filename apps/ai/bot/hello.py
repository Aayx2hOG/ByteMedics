import bot_2
def find_out(intent : str,text:str):
    if intent == "greet":
        return "Hello! 👋 I’m your Health Assistant."

    elif intent == "ask_symptom":
        return "Here are some common symptoms I can tell you about. Could you please specify the condition you’re asking for?"

    elif intent == "give_symptom":
        return bot_2.predict_disease(text)

    elif intent == "emergency":
        return "This sounds serious 🚨. Please call emergency services (e.g., 108 in India or 911 in the US) immediately or rush to the nearest hospital!"

    elif intent == "thanks":
        return "Goodbye! Take care of your health. 💙"

    elif intent == "gibberish":
        return "Sorry, I didn’t quite understand that. Could you rephrase it or ask me about your symptoms?"
