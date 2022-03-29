from django.shortcuts import render
from .serializer import *
from .models import *
from rest_framework.decorators import *
from rest_framework.response import Response
from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(serializer.validated_data['username'],None,serializer.validated_data['password'])
        Token.objects.get_or_create(user=user)
        return Response('Registered')
    else:
        return Response(serializer.errors)

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def author_posts(request, pk):
    posts = Post.objects.filter(author_id=pk)
    data = PostSerializer(posts, many=True).data
    print(data)
    return Response(data)
