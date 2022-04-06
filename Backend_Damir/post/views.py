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
from .permissions import *

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
    return Response(data)

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def all_posts(request):
    posts = Post.objects.all()
    data = PostSerializer(posts, many=True).data
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

class PostLikeView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request,*args, **kwargs):
        instance = self.get_object()
        obj, cond = PostLike.objects.get_or_create(posts=instance, user=request.user)
        if not cond:
            obj.delete()
        return Response({"Liked": cond})


class CommentLikeView(generics.RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request,*args, **kwargs):
        instance = self.get_object()
        obj, cond = CommentLike.objects.get_or_create(comment=instance, user=request.user)
        if not cond:
            obj.delete()
        return Response({"Liked": cond})

class PostMarkView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request,*args, **kwargs):
        instance = self.get_object()
        obj, cond = Bookmark.objects.get_or_create(post=instance, owner=request.user)
        if not cond:
            obj.delete()
        return Response(cond)


class PostUpdate(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,PostPermission)
    queryset = Post.objects.all()
    serializer_class = PostEditSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.user = request.user
        instance.save()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class CommentUpdate(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,CommentPermission)
    queryset = Comment.objects.all()
    serializer_class = CommentEditSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.user = request.user
        instance.save()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
