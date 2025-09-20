import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

data = pd.read_csv("dataset_n_model/health_intents.csv")
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(data["intent"])

#tokenize
tokenizer = tf.keras.preprocessing.text.Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts(data["text"])
X = tokenizer.texts_to_sequences(data["text"])
X = tf.keras.preprocessing.sequence.pad_sequences(X, padding="post", maxlen=20)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 2. Build model
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=5000, output_dim=32, input_length=20),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(len(set(y)), activation="softmax")
])

model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

# 3. Train
model.fit(X_train, y_train, epochs=152, validation_data=(X_test, y_test), verbose=1)

# 4. Save model + helpers
model.save("dataset_n_model/health_llm.keras")

import pickle
with open("dataset_n_model/tokenizer_llm.pkl", "wb") as f:
    pickle.dump(tokenizer, f)
with open("dataset_n_model/label_encoder_llm.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("✅ TensorFlow model trained & saved!")