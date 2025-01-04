from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam

# Dataset directory
dataset_path = "dataset/"  # Replace with the path to your dataset folder

# Image preprocessing
datagen = ImageDataGenerator(
    rescale=1.0/255,          # Normalize pixel values to [0, 1]
    validation_split=0.2      # 20% of images for validation
)

# Load training and validation data
train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),   # Resize images to 224x224 pixels
    batch_size=32,
    subset="training"
)
val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    subset="validation"
)

# Load MobileNetV2 (pre-trained model)
base_model = MobileNetV2(weights="imagenet", include_top=False)
x = base_model.output
x = GlobalAveragePooling2D()(x)  # Reduce dimensions while preserving features
x = Dense(128, activation="relu")(x)
predictions = Dense(train_data.num_classes, activation="softmax")(x)

# Define the final model
model = Model(inputs=base_model.input, outputs=predictions)

# Freeze the pre-trained layers
for layer in base_model.layers:
    layer.trainable = False

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.0001),
              loss="categorical_crossentropy",
              metrics=["accuracy"])

# Train the model
model.fit(
    train_data,
    validation_data=val_data,
    epochs=10,
    verbose=1
)

# Save the trained model
model.save("cattle_disease_model.h5")
print("Model saved as cattle_disease_model.h5")
