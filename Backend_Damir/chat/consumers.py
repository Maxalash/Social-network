from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .serializer import MessageSendSerializer, MessageSerializer

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        print(self.chat_id)
        self.room_group_name = 'chat_%s' % self.chat_id
        print(self.room_group_name)

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        id = text_data_json['id']
        data = {'text' : message, 'chat' : self.chat_id, 'owner' : id}
        serializer = MessageSendSerializer(data=data)
        if serializer.is_valid():
            self.messager = serializer.save()
            data = MessageSerializer(self.messager).data
            print('-----')
            print(message)
        else:
            print(serializer.errors)
        print('received')
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': self.messager.text,
                'id': id,
                'send_date': data['send_date'],
                'message_id': data['id']
            }
        )

    def chat_message(self, event):
        message = event['message']
        user_id = event['id']
        send_date = event['send_date']
        message_id = event['message_id']
        print(message)
        print('sent')

        self.send(text_data=json.dumps({
            'event': "Send",
            'message': message,
            'user_id': user_id,
            'chat_id': self.chat_id,
            'send_date': send_date,
            'message_id': message_id,
        }))
