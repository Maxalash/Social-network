from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

app_name = 'chat'

urlpatterns = (
    # path('post_comments_count/<int:pk>/', views.count_comments),  # count comments

    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), # get token
)
