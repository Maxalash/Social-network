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



@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def load_chats(request):
    chats = Chat.objects.filter(user=request.user)
    data = ChatSerializer(chats, many=True).data
    return Response(data)


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def create_chat(request):
    serializer = CreateChatSerializer(data=request.data)
    if serializer.is_valid():
        users = [request.user.id,request.data['user']]
        # chat,cond = Chat.objects.get_or_create(user=users)
        # print(chat)
        serializer.save(user=users)
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
