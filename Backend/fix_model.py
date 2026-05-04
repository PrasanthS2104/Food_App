import keras
from keras.layers import Dense
from keras.src.saving import serialization_lib

# ── Patch Dense to ignore quantization_config ──
original_dense_from_config = Dense.from_config.__func__

@classmethod
def patched_dense_from_config(cls, config):
    config.pop("quantization_config", None)
    return original_dense_from_config(cls, config)

Dense.from_config = patched_dense_from_config

# ── Now load and re-save ──
print("Loading food_model1.keras ...")
model = keras.models.load_model("food_model1.keras", compile=False)
print("Loaded! Re-saving as food_model1_fixed.keras ...")
model.save("food_model1_fixed.keras")
print("Done! Now rename food_model1_fixed.keras -> food_model1.keras")