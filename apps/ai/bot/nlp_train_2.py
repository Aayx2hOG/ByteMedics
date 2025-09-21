# health_bot_model.py

import tensorflow as tf
from tensorflow.keras import layers
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
#ds
data = pd.read_csv("dataset_n_model/data_health.csv")

# Step 2: Encode labels

texts = data["Symptoms"].values
labels = data["Disease_Name"].values

le = LabelEncoder()
labels_encoded = le.fit_transform(labels)

# Train/Test split
X_train, X_test, y_train, y_test = train_test_split(
    texts, labels_encoded, test_size=0.4, random_state=42
)

# Step 3: Text Vectorization

max_tokens = 5000
max_len = 50

vectorizer = layers.TextVectorization(
    max_tokens=max_tokens, output_sequence_length=max_len
)
vectorizer.adapt(X_train)

model = tf.keras.Sequential([
    vectorizer,
    layers.Embedding(input_dim=max_tokens, output_dim=64, mask_zero=True),
    layers.Bidirectional(layers.LSTM(64)),
    layers.Dense(64, activation="relu"),
    layers.Dense(len(le.classes_), activation="softmax")
])

model.compile(loss="sparse_categorical_crossentropy",
              optimizer="adam",
              metrics=["accuracy"])

model.fit(X_train, y_train,
          validation_data=(X_test, y_test),
          epochs=22,
          batch_size=2,
          verbose=1)


model.save("dataset_n_model/health_model.keras")
joblib.dump(le, "dataset_n_model/label_encoder.pkl")

print("✅ Model and label encoder saved!")
