from django.urls import path
from . import views

app_name = 'dialects'

urlpatterns = [
    path('/shared', views.shared_list),
    path('/participant', views.count_participant),
    path('/start', views.start_test),
    path('/<int:case_pk>', views.save_audio),
    path('/<int:case_pk>/result', views.get_result),
    path('/<int:case_pk>/image', views.save_image),
]
