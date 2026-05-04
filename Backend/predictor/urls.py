from django.urls import path
from .views import predict
from .views import predict, predict_food,download_report

urlpatterns = [
    path('predict/', predict, name="predict"),
    path('predict_food/',  predict_food,  name='predict_food'),
      path('download-report/', download_report, name="download_report"),
]