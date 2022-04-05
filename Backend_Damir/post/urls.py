from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

app_name = 'post'

urlpatterns = (
    # path('post_comments_count/<int:pk>/', views.count_comments),  # count comments
    path('posts/',views.UserViewSet.as_view({'get': 'list'})),

    path('posts/<int:pk>', views.author_posts),
    path('make_post/', views.make_post), # make post
    path('create_comment/', views.create_comment), # create comment

    path('register/',views.register), # register
    path('login/', obtain_auth_token, name='api_token_auth'), # get token
)
