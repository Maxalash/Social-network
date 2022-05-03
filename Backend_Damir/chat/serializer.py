from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


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

# class UsernameField(serializers.RelatedField):
#     def to_representation(self, obj):
#         user = None
#         request = self.context.get("request")
#         if request and hasattr(request, "user"):
#             user = request.user
#         if obj.user != user:
#             return user


class ChatSerializer(serializers.ModelSerializer):
    friend = serializers.SerializerMethodField()
    user = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='username'
    )
    # user = UsernameField(many=True)

    class Meta:
        model = Chat
        fields = '__all__'
    def get_friend(self,obj):

        # print(obj.user)
        # for i in obj.user:
        #     print(i)
        return str(obj.user)

class CreateChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['user']
