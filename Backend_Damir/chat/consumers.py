from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


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
        
        print(self.room_group_name)
        print(self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        # id = text_data_json['id']
        print('receive')
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                # 'id': id
            }
        )

    def chat_message(self, event):
        message = event['message']
        # id = event['id']
        print(message)
        # print(id)

        self.send(text_data=json.dumps({
            'event': "Send",
            'message': message,
            # 'id': id
        }))
