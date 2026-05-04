# from django.shortcuts import render
# import os
# import numpy as np
# import cv2
# import json
# import requests

# # ── Patch Dense FIRST before any keras model loading ──
# import keras
# from keras.layers import Dense

# _orig_dense_from_config = Dense.from_config.__func__

# @classmethod
# def _patched_dense_from_config(cls, config):
#     config.pop("quantization_config", None)
#     return _orig_dense_from_config(cls, config)

# Dense.from_config = _patched_dense_from_config

# # ── Now safe to import and load models ──
# from keras.models import load_model
# from keras.applications.efficientnet import preprocess_input
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.conf import settings
# from django.core.files.storage import default_storage
# from django.http import HttpResponse

# from reportlab.platypus import (
#     SimpleDocTemplate, Paragraph, Spacer,
#     Table, TableStyle, Image as RLImage
# )
# from reportlab.lib import colors
# from reportlab.lib.styles import getSampleStyleSheet
# from reportlab.lib.units import inch
# import datetime

# def get_usda_nutrition(food_name):
#     API_KEY = "WVuxtyoHlpUYAnVAhqX4WsGCgERDEGa2xYwu06df"

#     search_url = f"https://api.nal.usda.gov/fdc/v1/foods/search?query={food_name}&api_key={API_KEY}"

#     try:
#         res = requests.get(search_url)
#         data = res.json()

#         foods = data.get("foods", [])
#         if not foods:
#             return None

#         food = foods[0]

#         nutrients = food.get("foodNutrients", [])

#         def get_value(nutrient_name):
#             for n in nutrients:
#                 if nutrient_name.lower() in n["nutrientName"].lower():
#                     return n.get("value", 0)
#             return 0

#         return {
#             "calories": get_value("Energy"),
#             "protein": get_value("Protein"),
#             "fat": get_value("Total lipid"),
#             "carbs": get_value("Carbohydrate"),
#             "fiber": get_value("Fiber"),
#             "sugar": get_value("Sugars"),
#             "iron": get_value("Iron"),
#             "calcium": get_value("Calcium"),
#         }

#     except Exception as e:
#         print("USDA Error:", e)
#         return None
# # ============================
# # LOAD MODELS
# # ============================
# BASE_DIR = settings.BASE_DIR

# fruit_model = load_model(os.path.join(BASE_DIR, "fruit_model.keras"), compile=False)
# fresh_model = load_model(os.path.join(BASE_DIR, "fresh_model.keras"), compile=False)
# food_model  = load_model(os.path.join(BASE_DIR, "food_model1.keras"), compile=False)

# # ============================
# # LOAD FOOD CLASSES
# # ============================
# with open(os.path.join(BASE_DIR, "models/classes.json")) as f:
#     food_class_indices = json.load(f)

# food_class_labels = {v: k for k, v in food_class_indices.items()}

# # ============================
# # CLASS LABELS
# # ============================
# fruit_classes = [
#     'Almonds', 'Apple', 'Apricot', 'Avocado', 'Banana',
#     'Bean', 'Beetroot', 'BlackBerry', 'Blackberry',
#     'Blueberry', 'Cabbage', 'Cactus', 'Caju',
#     'Cantaloupe', 'Carambula', 'Carrot', 'Cauliflower',
#     'Cherimoya', 'Cherry', 'Chestnut', 'Clementine',
#     'Cocos', 'Corn', 'Cucumber', 'Dates',
#     'Eggplant', 'Fig', 'Ginger', 'Gooseberry',
#     'Granadilla', 'Grape', 'Grapefruit', 'Guava',
#     'Hazelnut', 'Huckleberry', 'Kaki', 'Kiwi',
#     'Kohlrabi', 'Kumquats', 'Lemon', 'Limes',
#     'Lychee', 'Mandarine', 'Mango', 'Mangostan',
#     'Maracuja', 'Melon', 'Mulberry', 'Nectarine', 'Nut'
# ]

# fresh_classes = ["Fresh", "Rotten"]
# IMG_SIZE = 224

# # ============================
# # IMAGE PREPROCESSING
# # ============================
# def preprocess_image(image_path):
#     img = cv2.imread(image_path)
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
#     img = preprocess_input(img.astype(np.float32))
#     return np.expand_dims(img, axis=0)

# def preprocess_food_image(image_path):
#     img = cv2.imread(image_path)
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     img = cv2.resize(img, (299, 299))
#     img = img.astype(np.float32) / 255.0
#     return np.expand_dims(img, axis=0)

# # ============================
# # PDF GENERATOR
# # ============================
# def generate_pdf_report(data, image_path):
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = 'attachment; filename="fruit_food_report.pdf"'

#     doc = SimpleDocTemplate(response)
#     elements = []
#     styles = getSampleStyleSheet()

#     elements.append(Paragraph("AI Food & Fruit Analysis Report", styles["Heading1"]))
#     elements.append(Spacer(1, 0.2 * inch))
#     elements.append(Paragraph(
#         f"Generated On: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}",
#         styles["Normal"]
#     ))
#     elements.append(Spacer(1, 0.4 * inch))

#     elements.append(Paragraph("Uploaded Image", styles["Heading2"]))
#     elements.append(Spacer(1, 0.2 * inch))
#     elements.append(RLImage(image_path, width=3 * inch, height=3 * inch))
#     elements.append(Spacer(1, 0.4 * inch))

#     result_table = [
#         ["Field", "Value"],
#         ["Food Detected",      data.get("food", "N/A")],
#         ["Detected Fruit",     data.get("fruit", "N/A")],
#         ["Condition",          data.get("condition", "N/A")],
#         ["Final Prediction",   data.get("prediction", "N/A")],
#         ["Food Confidence",    f"{round(data.get('confidence_food', 0) * 100, 2)}%"],
#         ["Fruit Confidence",   f"{round(data.get('confidence_fruit', 0) * 100, 2)}%"],
#         ["Freshness Confidence", f"{round(data.get('confidence_condition', 0) * 100, 2)}%"],
#     ]

#     table = Table(result_table, colWidths=[2.5 * inch, 3 * inch])
#     table.setStyle(TableStyle([
#         ('GRID',       (0, 0), (-1, -1), 1, colors.black),
#         ('BACKGROUND', (0, 0), (-1, 0),  colors.lightgrey),
#         ('FONTNAME',   (0, 0), (-1, 0),  'Helvetica-Bold'),
#     ]))

#     elements.append(Paragraph("AI Detection Results", styles["Heading2"]))
#     elements.append(Spacer(1, 0.2 * inch))
#     elements.append(table)
#     elements.append(Spacer(1, 0.4 * inch))

#     # Health risk
#     elements.append(Paragraph("Health Risk Assessment", styles["Heading2"]))
#     elements.append(Spacer(1, 0.2 * inch))
#     if data.get("condition") == "Fresh":
#         elements.append(Paragraph(
#             "✔ This fruit appears fresh and safe for consumption.",
#             styles["Normal"]
#         ))
#     else:
#         elements.append(Paragraph(
#             "⚠ This fruit appears spoiled. Avoid consumption.",
#             styles["Normal"]
#         ))

#     doc.build(elements)
#     return response

# # ============================
# # API: PREDICT (Fruit)
# # ============================
# @api_view(['POST'])
# def predict(request):
#     if 'image' not in request.FILES:
#         return Response({"error": "No image provided"}, status=400)

#     image = request.FILES['image']
#     file_path = default_storage.save("temp_fruit.jpg", image)
#     full_path = os.path.join(settings.MEDIA_ROOT, file_path)

#     img = preprocess_image(full_path)

#     fruit_pred = fruit_model.predict(img)
#     fruit_name = fruit_classes[int(np.argmax(fruit_pred))]

#     fresh_pred = fresh_model.predict(img)
#     condition  = fresh_classes[int(np.argmax(fresh_pred))]

#     return Response({
#         "fruit":                fruit_name,
#         "condition":            condition,
#         "prediction":           f"{condition} {fruit_name}",
#         "confidence_fruit":     float(np.max(fruit_pred)),
#         "confidence_condition": float(np.max(fresh_pred)),
#     })

# # ============================
# # API: PREDICT FOOD
# # ============================
# @api_view(['POST'])
# def predict_food(request):
#     if 'image' not in request.FILES:
#         return Response({"error": "No image provided"}, status=400)

#     try:
#         image = request.FILES['image']
#         file_path = default_storage.save("temp_food.jpg", image)
#         full_path = os.path.join(settings.MEDIA_ROOT, file_path)

#         food_img  = preprocess_food_image(full_path)
#         food_pred = food_model.predict(food_img)

#         food_index      = int(np.argmax(food_pred))
#         food_name       = food_class_labels.get(food_index, "Unknown Food")
#         food_confidence = float(np.max(food_pred))

#         # 🔥 GET NUTRITION DATA
#         nutrition_data = get_usda_nutrition(food_name)

#         return Response({
#             "food": food_name,
#             "confidence_food": food_confidence,
#             "nutrition": nutrition_data
#         })

#     except Exception as e:
#         print("ERROR:", str(e))
#         return Response({"error": str(e)}, status=500)
    
# def get_health_status(nutrition):
#     if not nutrition:
#         return "Unknown"

#     calories = nutrition.get("calories", 0)
#     fat = nutrition.get("fat", 0)
#     sugar = nutrition.get("sugar", 0)

#     if calories < 200 and fat < 10 and sugar < 10:
#         return "Healthy"
#     elif calories < 400:
#         return "Moderate"
#     else:
#         return "Unhealthy"
# # ============================
# # API: DOWNLOAD REPORT
# # ============================
# @api_view(['POST'])
# def download_report(request):
#     if 'image' not in request.FILES:
#         return Response({"error": "No image provided"}, status=400)

#     image = request.FILES['image']
#     file_path = default_storage.save("temp_report.jpg", image)
#     full_path = os.path.join(settings.MEDIA_ROOT, file_path)

#     # Fruit
#     img        = preprocess_image(full_path)
#     fruit_pred = fruit_model.predict(img)
#     fruit_name = fruit_classes[int(np.argmax(fruit_pred))]
#     fresh_pred = fresh_model.predict(img)
#     condition  = fresh_classes[int(np.argmax(fresh_pred))]

#     # Food
#     food_img        = preprocess_food_image(full_path)
#     food_pred       = food_model.predict(food_img)
#     food_index      = int(np.argmax(food_pred))
#     food_name       = food_class_labels[food_index]
#     food_confidence = float(np.max(food_pred))

#     final = food_name if food_confidence > 0.6 else f"{condition} {fruit_name}"

#     data = {
#         "food":                 food_name,
#         "fruit":                fruit_name,
#         "condition":            condition,
#         "prediction":           final,
#         "confidence_food":      food_confidence,
#         "confidence_fruit":     float(np.max(fruit_pred)),
#         "confidence_condition": float(np.max(fresh_pred)),
#     }

#     return generate_pdf_report(data, full_path)

from django.shortcuts import render
import os
import numpy as np
import cv2
import json
import requests
import datetime

# ── Fix Keras loading issue ──
import keras
from keras.layers import Dense

_orig_dense_from_config = Dense.from_config.__func__

@classmethod
def _patched_dense_from_config(cls, config):
    config.pop("quantization_config", None)
    return _orig_dense_from_config(cls, config)

Dense.from_config = _patched_dense_from_config

# ── Imports ──
from keras.models import load_model
from keras.applications.efficientnet import preprocess_input
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from django.core.files.storage import default_storage
from django.http import HttpResponse

from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer,
    Table, TableStyle, Image as RLImage
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

# ============================
# LOAD MODELS
# ============================
BASE_DIR = settings.BASE_DIR

fruit_model = load_model(os.path.join(BASE_DIR, "fruit_model.keras"), compile=False)
fresh_model = load_model(os.path.join(BASE_DIR, "fresh_model.keras"), compile=False)
food_model  = load_model(os.path.join(BASE_DIR, "food_model1.keras"), compile=False)

# ============================
# LOAD FOOD CLASSES
# ============================
with open(os.path.join(BASE_DIR, "models/classes.json")) as f:
    food_class_indices = json.load(f)

food_class_labels = {v: k for k, v in food_class_indices.items()}

# ============================
# CLASS LABELS
# ============================
fruit_classes = [
    'Almonds','Apple','Apricot','Avocado','Banana','Bean','Beetroot',
    'BlackBerry','Blueberry','Cabbage','Cactus','Carrot','Cauliflower',
    'Cherry','Clementine','Cucumber','Dates','Eggplant','Fig','Grape',
    'Grapefruit','Guava','Kiwi','Lemon','Mango','Melon','Nectarine'
]

fresh_classes = ["Fresh", "Rotten"]
IMG_SIZE = 224

# ============================
# IMAGE PREPROCESSING
# ============================
def preprocess_image(path):
    img = cv2.imread(path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = preprocess_input(img.astype(np.float32))
    return np.expand_dims(img, axis=0)

def preprocess_food_image(path):
    img = cv2.imread(path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (299, 299))
    img = img.astype(np.float32) / 255.0
    return np.expand_dims(img, axis=0)

# ============================
# USDA NUTRITION API
# ============================
def get_usda_nutrition(food_name):
    API_KEY = "WVuxtyoHlpUYAnVAhqX4WsGCgERDEGa2xYwu06df"

    url = f"https://api.nal.usda.gov/fdc/v1/foods/search?query={food_name}&api_key={API_KEY}"

    try:
        res = requests.get(url)

        # 🔥 CHECK STATUS
        if res.status_code != 200:
            print("USDA FAILED:", res.status_code)
            return None

        data = res.json()

        foods = data.get("foods", [])
        if not foods:
            print("No USDA result")
            return None

        nutrients = foods[0].get("foodNutrients", [])

        def get_val(name):
            for n in nutrients:
                if name.lower() in n["nutrientName"].lower():
                    return n.get("value", 0)
            return 0

        return {
            "calories": get_val("Energy"),
            "protein": get_val("Protein"),
            "fat": get_val("Total lipid"),
            "carbs": get_val("Carbohydrate"),
        }

    except Exception as e:
        print("API ERROR:", e)
        return None

# ============================
# FRUIT PREDICTION
# ============================
@api_view(['POST'])
def predict(request):
    if 'image' not in request.FILES:
        return Response({"error": "No image provided"}, status=400)

    image = request.FILES['image']
    path = default_storage.save("temp_fruit.jpg", image)
    full_path = os.path.join(settings.MEDIA_ROOT, path)

    img = preprocess_image(full_path)

    fruit_pred = fruit_model.predict(img)
    fruit = fruit_classes[int(np.argmax(fruit_pred))]

    fresh_pred = fresh_model.predict(img)
    condition = fresh_classes[int(np.argmax(fresh_pred))]

    return Response({
        "fruit": fruit,
        "condition": condition,
        "prediction": f"{condition} {fruit}",
        "confidence_fruit": float(np.max(fruit_pred)),
        "confidence_condition": float(np.max(fresh_pred)),
    })
# =========================
# 🧠 GUT HEALTH
# =========================
def get_gut_health(nutrition):
    issues = []

    if nutrition.get("fat", 0) > 10:
        issues.append("High fat → slows digestion")

    if nutrition.get("carbs", 0) > 30:
        issues.append("High carbs → gut imbalance")

    if len(issues) == 0:
        return "Good", ["Supports gut health"]

    return "Poor", issues


# =========================
# 📊 HEALTH SCORE
# =========================
def calculate_health_score(nutrition):
    score = 100

    if nutrition["calories"] > 300:
        score -= 25
    if nutrition["fat"] > 10:
        score -= 25
    if nutrition["carbs"] > 40:
        score -= 15

    return max(score, 10)

# ============================
# FOOD PREDICTION + NUTRITION
# ============================
@api_view(['POST'])
def predict_food(request):
    if 'image' not in request.FILES:
        return Response({"error": "No image provided"}, status=400)

    try:
        # 🔹 SAVE IMAGE
        image = request.FILES['image']
        path = default_storage.save("temp_food.jpg", image)
        full_path = os.path.join(settings.MEDIA_ROOT, path)

        # 🔹 MODEL PREDICTION
        food_img = preprocess_food_image(full_path)
        food_pred = food_model.predict(food_img)

        index = int(np.argmax(food_pred))
        food_name = food_class_labels.get(index, "Unknown Food")
        confidence = float(np.max(food_pred))

        # 🔹 CLEAN NAME
        clean_name = food_name.replace("_", " ")

        # 🔹 USDA API CALL
        nutrition = get_usda_nutrition(clean_name)

        # 🔥 FALLBACK SYSTEM (FIXED POSITION)
        if not nutrition or nutrition.get("calories", 0) == 0:

            print("Using fallback for:", clean_name)

            # 🔥 COMPLETE FALLBACK DATABASE (ALL 20 CLASSES)
            fallback = {
                "pizza": {"calories": 266, "protein": 11, "fat": 10, "carbs": 33},
                "burger": {"calories": 295, "protein": 17, "fat": 12, "carbs": 30},
                "french fries": {"calories": 312, "protein": 3, "fat": 14, "carbs": 42},
                "fried rice": {"calories": 250, "protein": 6, "fat": 8, "carbs": 35},
                "chicken curry": {"calories": 240, "protein": 20, "fat": 15, "carbs": 6},
                "omelette": {"calories": 154, "protein": 11, "fat": 12, "carbs": 2},
                "pancakes": {"calories": 227, "protein": 6, "fat": 9, "carbs": 28},
                "ice cream": {"calories": 207, "protein": 3, "fat": 11, "carbs": 24},
                "donuts": {"calories": 269, "protein": 4, "fat": 15, "carbs": 31},
                "waffles": {"calories": 291, "protein": 8, "fat": 14, "carbs": 33},
                "hot dog": {"calories": 290, "protein": 10, "fat": 26, "carbs": 2},
                "macaroni and cheese": {"calories": 164, "protein": 6, "fat": 6, "carbs": 20},
                "spaghetti bolognese": {"calories": 221, "protein": 12, "fat": 8, "carbs": 25},
                "ramen": {"calories": 436, "protein": 10, "fat": 14, "carbs": 60},
                "tacos": {"calories": 226, "protein": 9, "fat": 14, "carbs": 17},
                "nachos": {"calories": 346, "protein": 8, "fat": 19, "carbs": 36},
                "steak": {"calories": 271, "protein": 25, "fat": 19, "carbs": 0},
                "grilled cheese sandwich": {"calories": 400, "protein": 12, "fat": 20, "carbs": 35},
                "chocolate cake": {"calories": 350, "protein": 5, "fat": 15, "carbs": 50},
                "cup cakes": {"calories": 305, "protein": 3, "fat": 12, "carbs": 45},
            }

            nutrition = fallback.get(clean_name.lower(), {
                "calories": 250,
                "protein": 5,
                "fat": 10,
                "carbs": 30
            })

        # 🔹 HEALTH LOGIC (FIXED)
        calories = nutrition.get("calories", 0)
        fat = nutrition.get("fat", 0)

        if calories == 0:
            health = "Unknown"
        elif calories < 200 and fat < 10:
            health = "Healthy"
        elif calories < 400:
            health = "Moderate"
        else:
            health = "Unhealthy"

        # 🔹 RECOMMENDATION
        if calories == 0:
            recommendation = "No data available"
        elif calories < 200:
            recommendation = "Good for weight loss 🥗"
        elif calories < 400:
            recommendation = "Balanced meal ⚖️"
        else:
            recommendation = "High calorie ⚠️ Limit intake"

        # 🔹 FINAL RESPONSE
        gut_status, gut_points = get_gut_health(nutrition)
        health_score = calculate_health_score(nutrition)

        return Response({
            "food": food_name,
            "confidence_food": confidence,
            "nutrition": nutrition,
            "health": health,
            "recommendation": recommendation,

            # 🔥 NEW (frontend will use this)
            "gut_health": gut_status,
            "gut_issues": gut_points,
            "health_score": health_score
        })

    except Exception as e:
        print("ERROR:", e)
        return Response({"error": str(e)}, status=500)    

# ============================
# PDF REPORT
# ============================
@api_view(['POST'])
def download_report(request):
    if 'image' not in request.FILES:
        return Response({"error": "No image provided"}, status=400)

    # 🔹 SAVE IMAGE
    image = request.FILES['image']
    path = default_storage.save("temp.jpg", image)
    full_path = os.path.join(settings.MEDIA_ROOT, path)

    # 🔹 PREDICTIONS
    img = preprocess_image(full_path)

    fruit_pred = fruit_model.predict(img)
    fruit = fruit_classes[int(np.argmax(fruit_pred))]

    fresh_pred = fresh_model.predict(img)
    condition = fresh_classes[int(np.argmax(fresh_pred))]

    # 🔹 GET NUTRITION (IMPORTANT FIX)
    nutrition = get_usda_nutrition(fruit)

    if not nutrition:
        nutrition = {
            "calories": 100,
            "protein": 2,
            "fat": 1,
            "carbs": 25
        }

    # 🔹 GUT HEALTH FUNCTION
    def get_gut_health(nutrition):
        issues = []

        if nutrition.get("fat", 0) > 10:
            issues.append("High fat → slows digestion")

        if nutrition.get("carbs", 0) > 30:
            issues.append("High carbs → gut imbalance")

        if len(issues) == 0:
            return "Good", ["Supports gut health"]

        return "Poor", issues

    # 🔹 HEALTH SCORE
    def calculate_health_score(nutrition):
        score = 100

        if nutrition["calories"] > 300:
            score -= 25
        if nutrition["fat"] > 10:
            score -= 25
        if nutrition["carbs"] > 40:
            score -= 15

        return max(score, 10)

    gut_status, gut_points = get_gut_health(nutrition)
    health_score = calculate_health_score(nutrition)

    # 🔹 CREATE PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    doc = SimpleDocTemplate(response)
    elements = []
    styles = getSampleStyleSheet()

    # =========================
    # 🧾 HEADER
    # =========================
    elements.append(Paragraph("AI Nutrition & Health Report", styles["Heading1"]))
    elements.append(Spacer(1, 0.2 * inch))

    # =========================
    # 🍎 DETECTION
    # =========================
    elements.append(Paragraph(f"Detected: {fruit}", styles["Heading2"]))
    elements.append(Paragraph(f"Condition: {condition}", styles["Normal"]))
    elements.append(Spacer(1, 0.2 * inch))

    # =========================
    # 🧪 NUTRITION TABLE
    # =========================
    table_data = [
        ["Nutrient", "Value"],
        ["Calories", f"{nutrition.get('calories', 0)} kcal"],
        ["Protein", f"{nutrition.get('protein', 0)} g"],
        ["Fat", f"{nutrition.get('fat', 0)} g"],
        ["Carbs", f"{nutrition.get('carbs', 0)} g"],
    ]

    table = Table(table_data)
    table.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 1, colors.black),
        ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
    ]))

    elements.append(table)
    elements.append(Spacer(1, 0.3 * inch))

    # =========================
    # 🧠 GUT HEALTH
    # =========================
    elements.append(Paragraph("Gut Health Analysis", styles["Heading2"]))
    elements.append(Paragraph(f"Status: {gut_status}", styles["Normal"]))

    for point in gut_points:
        elements.append(Paragraph(f"• {point}", styles["Normal"]))

    elements.append(Spacer(1, 0.3 * inch))

    # =========================
    # ❤️ HEALTH SCORE
    # =========================
    elements.append(Paragraph(f"Overall Health Score: {health_score}/100", styles["Heading2"]))
    elements.append(Spacer(1, 0.2 * inch))

    # =========================
    # 🥗 RECOMMENDATION
    # =========================
    elements.append(Paragraph("Recommendation", styles["Heading2"]))

    if health_score > 70:
        elements.append(Paragraph("Good for regular consumption", styles["Normal"]))
    elif health_score > 40:
        elements.append(Paragraph("Consume in moderation", styles["Normal"]))
    else:
        elements.append(Paragraph("Avoid frequent consumption", styles["Normal"]))

    # =========================
    # BUILD PDF
    # =========================
    doc.build(elements)

    return response
 