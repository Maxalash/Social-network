from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class MessageLoadSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = '__all__'

    def get_messages(self, obj):
        messages = Message.objects.filter(chat=obj)
        return MessageSerializer(messages,many = True).data

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

class CreateChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['user']
