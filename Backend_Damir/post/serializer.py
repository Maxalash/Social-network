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
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'
class PostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
    def get_images(self,obj):
        images = obj.postimage_set.all()
        return PostImageSerializer(images, many=True, context=self.context).data if images else None
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
class BookmarkSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    class Meta:
        model = Bookmark
        fields = ['id','post']
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
class PostEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'text']
class CommentEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text']