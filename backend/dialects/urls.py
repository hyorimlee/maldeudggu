from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'dialects'

urlpatterns = [
    path('shared/', views.image_list),
    path('participant/', views.count_participant),
    path('start/', views.start_test),
    path('<int:case_pk>/', views.save_audio),
    path('<int:case_pk>/result/', views.get_result),
    path('<int:case_pk>/image/', views.save_image),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
