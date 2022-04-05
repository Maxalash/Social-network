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
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(serializer.validated_data['username'],None,serializer.validated_data['password'])
        # Token.objects.get_or_create(user=user)
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

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def make_post(request):
    data = dict(request.data.lists())
    images = []
    for image in data['image']:
        images.append({'image' : image,'owner' : request.user.id})
    image_check = ImageSerializer(data=images, many=True)
    if image_check.is_valid():
        post_check = PostMakeSerializer(data=request.data)
        if post_check.is_valid():
            post = post_check.save(author=request.user)
            for i in range(len(images)):
                images[i]['post'] = post.id
            image_create_serializer = ImageCreateSerializer(data=images,many=True)
            if image_create_serializer.is_valid():
                image_create_serializer.save()
            else:
                return Response(image_create_serializer.errors)
        else:
            return Response(post_check.errors)
    else:
        return Response(image_check.errors)
    return Response({'post':post_check.data,'images':image_create_serializer.data})


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def create_comment(request):
    serializer = CreateCommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

