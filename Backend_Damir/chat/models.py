from django.db import models

class Message(models.Model):
    text = models.TextField()
    sender = models.ForeignKey('auth.User', related_name='sending_message', on_delete=models.DO_NOTHING)
    receiver = models.ForeignKey('auth.User', related_name='receiving_message', on_delete=models.DO_NOTHING)
    send_date = models.DateTimeField(auto_now_add=True,)

    # seen_for_sender = models.BooleanField(default=True)
    # seen_for_receiver = models.BooleanField(default=True)
#asdsda
class MessageImage(models.Model):
    message = models.ForeignKey(Message,on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    image = models.ImageField()
