from django.db import models

class Chat(models.Model):
    user = models.ManyToManyField('auth.User',related_name='user_chats')
    created_date = models.DateTimeField(auto_now_add=True)

class Session(models.Model):
    user = models.ForeignKey('auth.User',on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)

class Message(models.Model):
    text = models.TextField()
    owner = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    send_date = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat,on_delete=models.DO_NOTHING)

class MessageImage(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    image = models.ImageField()
