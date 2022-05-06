from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','id']
class MessageSerializer(serializers.ModelSerializer):
    yours = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
<<<<<<< HEAD
=======

>>>>>>> 61eb2178655eb4bff8e2f2d8808e8615199aa786
    class Meta:
        model = Message
        fields = '__all__'
    def get_yours(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        return True if user == obj.owner else False
<<<<<<< HEAD
    def get_owner(self,obj):
        return obj.owner.username
=======

    def get_owner(self,obj):
        return obj.owner.username

>>>>>>> 61eb2178655eb4bff8e2f2d8808e8615199aa786
class MessageSendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['text','owner','chat']
class MessageLoadSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    class Meta:
        model = Chat
        fields = '__all__'
    def get_messages(self, obj):
        messages = Message.objects.filter(chat=obj)
        return MessageSerializer(messages,many = True).data
<<<<<<< HEAD
# class UsernameField(serializers.RelatedField):
#     def to_representation(self, obj):
#         user = None
#         request = self.context.get("request")
#         if request and hasattr(request, "user"):
#             user = request.user
#         if obj.user != user:
#             return user
=======



>>>>>>> 61eb2178655eb4bff8e2f2d8808e8615199aa786
class ChatSerializer(serializers.ModelSerializer):
    friend = serializers.SerializerMethodField()
    user = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='username'
    )
<<<<<<< HEAD
    # user = UsernameField(many=True)
=======

>>>>>>> 61eb2178655eb4bff8e2f2d8808e8615199aa786
    class Meta:
        model = Chat
        fields = '__all__'
    def get_friend(self,obj):
<<<<<<< HEAD
        # print(obj.user)
        # for i in obj.user:
        #     print(i)
=======
>>>>>>> 61eb2178655eb4bff8e2f2d8808e8615199aa786
        return str(obj.user)
class CreateChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['user']