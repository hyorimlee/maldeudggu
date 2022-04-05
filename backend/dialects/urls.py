from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'dialects'

urlpatterns = [
    path('sentence/<int:sentence_pk>/',views.get_sentence),
    path('sentence/',views.get_sentences),
    path('<int:case_pk>/my/', views.get_image),
    path('shared/', views.get_images),
    path('participant/', views.count_participant),
    path('start/', views.start_test),
    path('<int:case_pk>/', views.save_audio),
    path('<int:case_pk>/result/', views.get_result),
    path('<int:case_pk>/image/', views.save_image),
    path('<int:case_pk>/download/', views.download_image),
    path('<int:case_pk>/survey/', views.save_survey)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
