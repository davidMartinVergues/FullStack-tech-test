from django.urls import path
from . import views

app_name='api'

urlpatterns = [
    path('create-observation/', views.create_user_observation, name='create_user_observation' ),
    path('create-identification-task/', views.create_identification_task, name='create_identification_task'),
    path('user-observatioins/', views.list_user_observations, name= 'list_user_observations'),
    path('identification-tasks/', views.list_identification_tasks, name= 'list_identification_tasks'),
    path('identification-tasks/status/<str:status>', views.get_identification_tasks_by_status, name='get_identification_tasks_by_status'),
    path('identification-task/<str:id>/delete/', views.delete_identification_task, name='delete_identification_task' ),
    path('identification-task/<str:id>/change-status/', views.update_status_identification_to_complete, name='update_status_identification_to_complete'),
    path('identification-task/<int:identification_id>/image/', views.get_mosquito_image, name='get_mosquito_image'),
]

