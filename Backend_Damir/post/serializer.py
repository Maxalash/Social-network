from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text']

class PostMakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title','text']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image','owner']

class ImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image','owner','post']

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text','post']
