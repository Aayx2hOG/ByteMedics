import tensorflow as tf
import pickle
import hello

# Load everything
model = tf.keras.models.load_model("dataset_n_model/health_llm.keras")
tokenizer = pickle.load(open("dataset_n_model/tokenizer_llm.pkl", "rb"))
label_encoder = pickle.load(open("dataset_n_model/label_encoder_llm.pkl", "rb"))

def predict_sol(text: str):
    seq = tokenizer.texts_to_sequences([text])
    padded = tf.keras.preprocessing.sequence.pad_sequences(seq, padding="post", maxlen=20)
    pred = model.predict(padded)
    label_idx = pred.argmax(axis=1)[0]
    return label_encoder.inverse_transform([label_idx])[0]

# Test
if __name__ == "__main__":
    while True:
        x= int(input("Choice:"))
        if x==1:
            text = input("Enter text:")
            y = predict_sol(text).strip()
            print(y)
            print(hello.find_out(y,text))
        elif x==2:
            break